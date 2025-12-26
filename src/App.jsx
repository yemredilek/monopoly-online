import React, { useState, useEffect } from 'react';
import { Dice5, User, Coins, ArrowRight, History, Gavel } from 'lucide-react';
import { useGameActions } from './hooks/useGameActions';
import { BOARD_DATA, TOKENS, COLORS, INITIAL_PLAYER_MONEY, getInitialState } from './data/boardData';

// --- STORAGE SHIM FOR LOCALHOST ---
const storageShim = {
  getItem: async (key) => JSON.parse(localStorage.getItem(key)),
  setItem: async (key, val) => localStorage.setItem(key, JSON.stringify(val))
};
const storage = window.storage || storageShim;

const MonopolyApp = () => {
  const [gameState, setGameState] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const [playerName, setName] = useState('');

  const updateState = async (newState) => {
    const stateWithTimestamp = { ...newState, lastUpdate: Date.now() };
    setGameState(stateWithTimestamp);
    await storage.setItem(`monopoly:room:${newState.roomCode}`, stateWithTimestamp);
  };

  const { calculateRent, handleBuild } = useGameActions(gameState, updateState, playerId);

  const createRoom = async () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const id = Math.random().toString(36).substring(7);
    const newPlayer = {
      id,
      name: playerName || "Host",
      token: TOKENS[0],
      position: 0,
      money: INITIAL_PLAYER_MONEY,
      isBankrupt: false,
      inJail: false,
    };
    const newState = getInitialState(code);
    newState.players = [newPlayer];
    setPlayerId(id);
    await updateState(newState);
  };

  const handleRoll = async () => {
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    const total = d1 + d2; // DECLARATION FIXED
    const isDouble = d1 === d2;

    const players = [...gameState.players];
    const currentPlayer = players[gameState.currentPlayerIndex];
    let newPos = (currentPlayer.position + total) % 40;
    let money = currentPlayer.money;

    if (newPos < currentPlayer.position) {
      money += 200; // PASSING GO [cite: 288]
    }

    players[gameState.currentPlayerIndex] = { ...currentPlayer, position: newPos, money };
    await updateState({
      ...gameState,
      players,
      dice: [d1, d2],
      turnPhase: 'ACTION',
      logs: [`${currentPlayer.name} rolled ${total}!`, ...gameState.logs].slice(0, 10)
    });
  };

  if (!gameState || !gameState.gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 space-y-6">
        <h1 className="text-5xl font-black text-blue-900 tracking-tighter">MONOPOLY</h1>
        <div className="bg-white p-8 rounded-2xl shadow-xl border w-96 space-y-4">
          <input className="w-full p-3 border rounded outline-none focus:ring-2 ring-blue-500" placeholder="Your Name" value={playerName} onChange={e => setName(e.target.value)} />
          <button onClick={createRoom} className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700 transition">CREATE ROOM</button>
          {gameState && (
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-bold text-blue-400">ROOM CODE</p>
              <p className="text-2xl font-black text-blue-900 tracking-widest">{gameState.roomCode}</p>
              <button onClick={() => updateState({ ...gameState, gameStarted: true, turnPhase: 'ROLL' })} className="mt-4 bg-green-600 text-white p-3 rounded w-full font-bold">START GAME</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-200 p-4 flex flex-col items-center justify-center overflow-hidden">
      <div className="grid grid-cols-11 grid-rows-11 aspect-square w-full max-w-[750px] bg-blue-50 border-4 border-blue-900 relative shadow-2xl rounded-lg">
        {gameState.boardStates.map((space, idx) => {
          let gridArea = "";
          // Perimeter Logic: 0-10 Bottom, 11-20 Left, 21-30 Top, 31-39 Right 
          if (idx <= 10) gridArea = `11 / ${11 - idx}`;
          else if (idx <= 20) gridArea = `${21 - idx} / 1`;
          else if (idx <= 30) gridArea = `1 / ${idx - 19}`;
          else gridArea = `${idx - 29} / 11`;

          return (
            <div key={idx} style={{ gridArea }} className={`border-[0.5px] border-gray-300 flex flex-col items-center justify-center text-[7px] md:text-[9px] font-bold p-1 relative uppercase text-center leading-tight ${space.color || 'bg-white'}`}>
              {space.type === 'site' && <div className={`absolute top-0 left-0 right-0 h-2 md:h-3 ${COLORS[space.group]} border-b border-black`} />}
              <span className="mt-2">{space.name}</span>
              {space.price > 0 && <span className="mt-auto">£{space.price}</span>}
              <div className="absolute inset-0 flex flex-wrap gap-1 items-center justify-center pointer-events-none">
                {gameState.players.filter(p => p.position === idx).map(p => (
                  <span key={p.id} className="text-xl md:text-2xl drop-shadow animate-bounce">{p.token}</span>
                ))}
              </div>
            </div>
          );
        })}

        {/* CENTER STAGE  */}
        <div className="col-start-2 col-end-11 row-start-2 row-end-11 flex flex-col items-center justify-center bg-blue-100/30">
          <div className="text-6xl font-black text-blue-900/5 absolute rotate-45 pointer-events-none">MONOPOLY</div>
          <div className="flex gap-4 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-blue-200 text-4xl font-black text-blue-900">{gameState.dice[0]}</div>
            <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-blue-200 text-4xl font-black text-blue-900">{gameState.dice[1]}</div>
          </div>
          {gameState.players[gameState.currentPlayerIndex].id === playerId && gameState.turnPhase === 'ROLL' && (
            <button onClick={handleRoll} className="bg-blue-600 text-white px-12 py-4 rounded-2xl font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition">ROLL DICE</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonopolyApp;