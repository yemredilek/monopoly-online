import React, { useState, useEffect, useReducer, useRef, useMemo } from 'react';
import {
  Dice5,
  User,
  Home,
  Hotel,
  Coins,
  Gavel,
  ArrowRight,
  ShieldCheck,
  LogOut,
  MessageSquare,
  History,
  Info
} from 'lucide-react';

// --- CONSTANTS & BOARD DATA ---
const BOARD_DATA = [
  { id: 0, name: "GO", type: "special", price: 0, rent: 0, color: "bg-gray-200" },
  { id: 1, name: "Old Kent Road", type: "site", color: "brown", price: 60, rent: [2, 10, 30, 90, 160, 250], houseCost: 50, group: "brown" },
  { id: 2, name: "Comm. Chest", type: "chest", color: "bg-gray-100" },
  { id: 3, name: "Whitechapel Road", type: "site", color: "brown", price: 60, rent: [4, 20, 60, 180, 320, 450], houseCost: 50, group: "brown" },
  { id: 4, name: "Income Tax", type: "tax", price: 200 },
  { id: 5, name: "Reading Railroad", type: "station", price: 200, rent: [25, 50, 100, 200], group: "station" },
  { id: 6, name: "The Angel Islington", type: "site", color: "lightblue", price: 100, rent: [6, 30, 90, 270, 400, 550], houseCost: 50, group: "lightblue" },
  { id: 7, name: "Chance", type: "chance", color: "bg-gray-100" },
  { id: 8, name: "Euston Road", type: "site", color: "lightblue", price: 100, rent: [6, 30, 90, 270, 400, 550], houseCost: 50, group: "lightblue" },
  { id: 9, name: "Pentonville Road", type: "site", color: "lightblue", price: 120, rent: [8, 40, 100, 300, 450, 600], houseCost: 50, group: "lightblue" },
  { id: 10, name: "Jail", type: "special", color: "bg-orange-200" },
  { id: 11, name: "Pall Mall", type: "site", color: "pink", price: 140, rent: [10, 50, 150, 450, 625, 750], houseCost: 100, group: "pink" },
  { id: 12, name: "Electric Company", type: "utility", price: 150, group: "utility" },
  { id: 13, name: "Whitehall", type: "site", color: "pink", price: 140, rent: [10, 50, 150, 450, 625, 750], houseCost: 100, group: "pink" },
  { id: 14, name: "Northumberland Ave", type: "site", color: "pink", price: 160, rent: [12, 60, 180, 500, 700, 900], houseCost: 100, group: "pink" },
  { id: 15, name: "Marylebone Station", type: "station", price: 200, rent: [25, 50, 100, 200], group: "station" },
  { id: 16, name: "Bow Street", type: "site", color: "orange", price: 180, rent: [14, 70, 200, 550, 750, 950], houseCost: 100, group: "orange" },
  { id: 17, name: "Comm. Chest", type: "chest" },
  { id: 18, name: "Marlborough St", type: "site", color: "orange", price: 180, rent: [14, 70, 200, 550, 750, 950], houseCost: 100, group: "orange" },
  { id: 19, name: "Vine Street", type: "site", color: "orange", price: 200, rent: [16, 80, 220, 600, 800, 1000], houseCost: 100, group: "orange" },
  { id: 20, name: "Free Parking", type: "special", color: "bg-gray-100" },
  { id: 21, name: "Strand", type: "site", color: "red", price: 220, rent: [18, 90, 250, 700, 875, 1050], houseCost: 150, group: "red" },
  { id: 22, name: "Chance", type: "chance" },
  { id: 23, name: "Fleet Street", type: "site", color: "red", price: 220, rent: [18, 90, 250, 700, 875, 1050], houseCost: 150, group: "red" },
  { id: 24, name: "Trafalgar Square", type: "site", color: "red", price: 240, rent: [20, 100, 300, 750, 925, 1100], houseCost: 150, group: "red" },
  { id: 25, name: "Fenchurch St Station", type: "station", price: 200, rent: [25, 50, 100, 200], group: "station" },
  { id: 26, name: "Leicester Square", type: "site", color: "yellow", price: 260, rent: [22, 110, 330, 800, 975, 1150], houseCost: 150, group: "yellow" },
  { id: 27, name: "Coventry Street", type: "site", color: "yellow", price: 260, rent: [22, 110, 330, 800, 975, 1150], houseCost: 150, group: "yellow" },
  { id: 28, name: "Water Works", type: "utility", price: 150, group: "utility" },
  { id: 29, name: "Piccadilly", type: "site", color: "yellow", price: 280, rent: [24, 120, 360, 850, 1025, 1200], houseCost: 150, group: "yellow" },
  { id: 30, name: "Go To Jail", type: "special", color: "bg-blue-900 text-white" },
  { id: 31, name: "Regent Street", type: "site", color: "green", price: 300, rent: [26, 130, 390, 900, 1100, 1275], houseCost: 200, group: "green" },
  { id: 32, name: "Oxford Street", type: "site", color: "green", price: 300, rent: [26, 130, 390, 900, 1100, 1275], houseCost: 200, group: "green" },
  { id: 33, name: "Comm. Chest", type: "chest" },
  { id: 34, name: "Bond Street", type: "site", color: "green", price: 320, rent: [28, 150, 450, 1000, 1200, 1400], houseCost: 200, group: "green" },
  { id: 35, name: "Liverpool St Station", type: "station", price: 200, rent: [25, 50, 100, 200], group: "station" },
  { id: 36, name: "Chance", type: "chance" },
  { id: 37, name: "Park Lane", type: "site", color: "darkblue", price: 350, rent: [35, 175, 500, 1100, 1300, 1500], houseCost: 200, group: "darkblue" },
  { id: 38, name: "Super Tax", type: "tax", price: 100 },
  { id: 39, name: "Mayfair", type: "site", color: "darkblue", price: 400, rent: [50, 200, 600, 1400, 1700, 2000], houseCost: 200, group: "darkblue" },
];

const INITIAL_PLAYER_MONEY = 1500;
const TOKENS = ['🏎️', '🎩', '🐕', '🚢', '🦖', '💡'];
const COLORS = {
  brown: 'bg-[#955436]',
  lightblue: 'bg-[#aae0fa]',
  pink: 'bg-[#d93a96]',
  orange: 'bg-[#f7941d]',
  red: 'bg-[#ed1b24]',
  yellow: 'bg-[#fef200]',
  green: 'bg-[#1fb25a]',
  darkblue: 'bg-[#0072bb]',
};

// --- INITIAL STATE ---
const getInitialState = (roomCode) => ({
  roomCode,
  players: [],
  currentPlayerIndex: 0,
  boardStates: BOARD_DATA.map(prop => ({
    ...prop,
    owner: null,
    houses: 0,
    hotel: false,
    mortgaged: false
  })),
  turnPhase: 'LOBBY', // LOBBY, ROLL, ACTION, MANAGE, AUCTION
  dice: [1, 1],
  logs: ["Welcome to Monopoly Online!"],
  lastUpdate: Date.now(),
  gameStarted: false,
  winner: null,
  doublesCount: 0,
  auction: {
    propertyId: null,
    highestBid: 0,
    highestBidder: null,
    bidsCount: 0,
    active: false
  }
});

// --- AUCTION LOGIC ---

const AuctionModal = ({ auction, players, onBid, onFold, myId }) => {
  if (!auction.active) return null;

  const property = BOARD_DATA.find(p => p.id === auction.propertyId);
  const highestBidderName = players.find(p => p.id === auction.highestBidder)?.name || "No one";

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border-4 border-yellow-500">
        <div className="bg-yellow-500 p-6 text-center">
          <h2 className="text-3xl font-black text-white italic tracking-tighter flex items-center justify-center gap-2">
            <Gavel size={32} /> AUCTION!
          </h2>
          <p className="text-yellow-100 font-bold uppercase text-sm mt-1">{property.name}</p>
        </div>

        <div className="p-8 text-center space-y-6">
          <div className="bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-bold text-xs uppercase mb-1">Current Highest Bid</p>
            <p className="text-5xl font-black text-blue-900">£{auction.highestBid}</p>
            <p className="text-blue-600 font-bold mt-2">By: {highestBidderName}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[1, 10, 50, 100].map(amount => (
              <button
                key={amount}
                onClick={() => onBid(auction.highestBid + amount)}
                className="bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition transform active:scale-95"
              >
                +£{amount}
              </button>
            ))}
          </div>

          <button
            onClick={onFold}
            className="w-full text-gray-400 font-bold py-2 hover:text-red-500 transition"
          >
            I'M OUT / PASS
          </button>
        </div>
      </div>
    </div>
  );
};

// --- HELPER FUNCTIONS ---
const generateRoomCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

// --- COMPONENTS ---

const MonopolyApp = () => {
  const [gameState, setGameState] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const [roomCodeInput, setRoomCodeInput] = useState('');
  const [playerName, setName] = useState('');
  const [syncTimer, setSyncTimer] = useState(0);

  // Sync with window.storage
  useEffect(() => {
    if (!gameState?.roomCode) return;

    const interval = setInterval(async () => {
      const remoteState = await window.storage.getItem(`monopoly:room:${gameState.roomCode}`, { shared: true });
      if (remoteState && remoteState.lastUpdate > (gameState?.lastUpdate || 0)) {
        setGameState(remoteState);
      }
      setSyncTimer(prev => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [gameState?.roomCode, gameState?.lastUpdate]);

  const updateState = async (newState) => {
    const stateWithTimestamp = { ...newState, lastUpdate: Date.now() };
    setGameState(stateWithTimestamp);
    await window.storage.setItem(`monopoly:room:${newState.roomCode}`, stateWithTimestamp, { shared: true });
  };

  const createRoom = async () => {
    const code = generateRoomCode();
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

  const joinRoom = async () => {
    const remoteState = await window.storage.getItem(`monopoly:room:${roomCodeInput.toUpperCase()}`, { shared: true });
    if (!remoteState) return alert("Room not found");

    const id = Math.random().toString(36).substring(7);
    const newPlayer = {
      id,
      name: playerName || `Player ${remoteState.players.length + 1}`,
      token: TOKENS[remoteState.players.length % TOKENS.length],
      position: 0,
      money: INITIAL_PLAYER_MONEY,
      isBankrupt: false,
      inJail: false,
    };

    const newState = {
      ...remoteState,
      players: [...remoteState.players, newPlayer]
    };
    setPlayerId(id);
    await updateState(newState);
  };

  const startGame = async () => {
    await updateState({ ...gameState, gameStarted: true, turnPhase: 'ROLL' });
  };

  const addLog = (msg) => {
    const newLogs = [msg, ...gameState.logs].slice(0, 10);
    return newLogs;
  };

  // --- GAME LOGIC ---
  const handleRoll = async () => {
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    const isDouble = d1 === d2;
    const newDoublesCount = isDouble ? (gameState.doublesCount || 0) + 1 : 0;

    const players = [...gameState.players];
    const currentPlayer = players[gameState.currentPlayerIndex];

    if (newDoublesCount === 3) {
      players[gameState.currentPlayerIndex] = {
        ...currentPlayer,
        position: 10, // Jail space
        inJail: true
      };
      await updateState({
        ...gameState,
        players,
        doublesCount: 0,
        turnPhase: 'MANAGE',
        logs: addLog(`${currentPlayer.name} rolled 3 doubles and went to JAIL!`)
      });
      return;
    }

    let newPos = (currentPlayer.position + total) % 40;
    let money = currentPlayer.money;
    let logs = addLog(`${currentPlayer.name} rolled ${total} (${d1}+${d2})`);

    // Passed GO
    if (newPos < currentPlayer.position) {
      money += 200;
      logs = [`${currentPlayer.name} passed GO and collected £200`, ...logs];
    }

    players[gameState.currentPlayerIndex] = { ...currentPlayer, position: newPos, money };

    await updateState({
      ...gameState,
      players,
      dice: [d1, d2],
      turnPhase: 'ACTION',
      logs
    });
  };

  const handleAction = async (actionType) => {
    const players = [...gameState.players];
    const board = [...gameState.boardStates];
    const currentPlayer = players[gameState.currentPlayerIndex];
    const currentPos = board[currentPlayer.position];
    let logs = [...gameState.logs];

    if (actionType === 'BUY') {
      if (currentPlayer.money >= currentPos.price) {
        currentPlayer.money -= currentPos.price;
        board[currentPlayer.position].owner = currentPlayer.id;
        logs = addLog(`${currentPlayer.name} bought ${currentPos.name} for £${currentPos.price}`);
      }
    } else if (actionType === 'PAY_RENT') {
      const owner = players.find(p => p.id === currentPos.owner);
      const rentAmount = currentPos.rent[currentPos.houses]; // Basic simplified rent
      currentPlayer.money -= rentAmount;
      owner.money += rentAmount;
      logs = addLog(`${currentPlayer.name} paid £${rentAmount} rent to ${owner.name}`);
    }

    await updateState({
      ...gameState,
      players,
      boardStates: board,
      turnPhase: 'MANAGE',
      logs
    });
  };

  const endTurn = async () => {
    const nextIndex = (gameState.currentPlayerIndex + 1) % gameState.players.length;
    await updateState({
      ...gameState,
      currentPlayerIndex: nextIndex,
      turnPhase: 'ROLL'
    });
  };

  // --- RENDERING HELPERS ---
  const renderLobby = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
      <div className="text-center">
        <h1 className="text-5xl font-black text-blue-900 tracking-tighter">MONOPOLY</h1>
        <p className="text-gray-500 font-medium">REAL-TIME MULTIPLAYER</p>
      </div>

      {!gameState ? (
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 w-96 space-y-4">
          <input
            className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 ring-blue-500"
            placeholder="Your Name"
            value={playerName}
            onChange={e => setName(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-3">
            <button onClick={createRoom} className="bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition">CREATE ROOM</button>
            <div className="flex flex-col space-y-2">
              <input
                className="w-full px-4 py-3 border rounded-lg text-center uppercase"
                placeholder="CODE"
                value={roomCodeInput}
                onChange={e => setRoomCodeInput(e.target.value)}
              />
              <button onClick={joinRoom} className="bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-700 transition">JOIN</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 w-96 text-center space-y-6">
          <div>
            <p className="text-sm text-gray-400 font-bold uppercase">Room Code</p>
            <p className="text-4xl font-mono font-bold text-blue-600 tracking-widest">{gameState.roomCode}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-bold text-gray-500">PLAYERS ({gameState.players.length}/8)</p>
            {gameState.players.map(p => (
              <div key={p.id} className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg border">
                <span className="text-2xl">{p.token}</span>
                <span className="font-bold text-gray-700">{p.name}</span>
                {p.id === playerId && <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-bold">YOU</span>}
              </div>
            ))}
          </div>
          {gameState.players[0].id === playerId && (
            <button
              onClick={startGame}
              disabled={gameState.players.length < 2}
              className="w-full bg-blue-600 text-white font-black py-4 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all transform hover:scale-105"
            >
              START GAME
            </button>
          )}
          <p className="text-xs text-gray-400">Waiting for host to start...</p>
        </div>
      )}
    </div>
  );

  if (!gameState || !gameState.gameStarted) {
    return <div className="min-h-screen bg-slate-50 font-sans p-4">{renderLobby()}</div>;
  }

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const isMyTurn = currentPlayer.id === playerId;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row p-2 md:p-6 gap-6 max-h-screen overflow-hidden">
      {/* --- BOARD SECTION --- */}
      <div className="relative aspect-square w-full max-w-[800px] bg-[#bfdbfe] border-4 border-blue-900 rounded-lg shadow-2xl overflow-hidden grid grid-cols-11 grid-rows-11">
        {gameState.boardStates.map((space, idx) => {
          // Calculate grid position for a standard Monopoly board perimeter
          let gridArea = "";
          if (idx <= 10) gridArea = `11 / ${11 - idx}`; // Bottom row (Right to Left)
          else if (idx <= 20) gridArea = `${21 - idx} / 1`; // Left col (Bottom to Top)
          else if (idx <= 30) gridArea = `1 / ${idx - 19}`; // Top row (Left to Right)
          else gridArea = `${idx - 29} / 11`; // Right col (Top to Bottom)

          return (
            <div
              key={space.id}
              style={{ gridArea }}
              className={`border-[0.5px] border-gray-400 flex flex-col items-center justify-between text-[8px] md:text-[10px] font-bold text-center p-0.5 md:p-1 relative ${space.color || 'bg-white'}`}
            >
              {space.type === 'site' && <div className={`w-full h-2 md:h-4 mb-1 border-b border-black ${COLORS[space.group]}`} />}
              <div className="uppercase leading-tight">{space.name}</div>
              {space.price > 0 && <div>£{space.price}</div>}

              {/* Tokens on this space */}
              <div className="absolute inset-0 flex flex-wrap items-center justify-center pointer-events-none gap-0.5">
                {gameState.players.filter(p => p.position === idx).map(p => (
                  <span key={p.id} className="text-xl drop-shadow-md animate-bounce">{p.token}</span>
                ))}
              </div>

              {/* Ownership Indicator */}
              {space.owner && (
                <div className="absolute top-0 right-0 p-0.5 bg-white rounded-bl-md border-l border-b border-gray-300">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#3b82f6' }} />
                </div>
              )}
            </div>
          );
        })}

        {/* --- CENTER STAGE --- */}
        <div className="col-start-2 col-end-11 row-start-2 row-end-11 bg-[#e2efff] flex flex-col items-center justify-center p-8 space-y-6">
          <div className="text-6xl font-black text-blue-900/10 absolute rotate-45 select-none pointer-events-none">MONOPOLY</div>

          {/* Dice Result Display */}
          <div className="flex space-x-4">
            <div className="bg-white p-4 rounded-xl shadow-lg border-2 border-blue-200 transform rotate-3">
              <span className="text-4xl font-bold text-blue-800">{gameState.dice[0]}</span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-lg border-2 border-blue-200 transform -rotate-3">
              <span className="text-4xl font-bold text-blue-800">{gameState.dice[1]}</span>
            </div>
          </div>

          <div className="text-center space-y-2 max-w-md bg-white/50 p-4 rounded-2xl backdrop-blur-sm">
            <p className="text-blue-900 font-black text-xl uppercase tracking-wider">
              {gameState.turnPhase === 'ROLL' ? `${currentPlayer.name}'s Turn` : 'Current Action'}
            </p>
            <p className="text-blue-700 font-medium">
              {gameState.logs[0]}
            </p>
          </div>

          {/* Action Area */}
          <div className="flex flex-wrap justify-center gap-3">
            {isMyTurn && gameState.turnPhase === 'ROLL' && (
              <button
                onClick={handleRoll}
                className="bg-blue-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:bg-blue-700 flex items-center gap-2 transform active:scale-95 transition"
              >
                <Dice5 size={20} /> ROLL DICE
              </button>
            )}

            {isMyTurn && gameState.turnPhase === 'ACTION' && (
              <>
                {gameState.boardStates[currentPlayer.position].owner === null && gameState.boardStates[currentPlayer.position].type === 'site' ? (
                  <button
                    onClick={() => handleAction('BUY')}
                    className="bg-green-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:bg-green-700 flex items-center gap-2"
                  >
                    <Coins size={20} /> BUY FOR £{gameState.boardStates[currentPlayer.position].price}
                  </button>
                ) : null}

                {gameState.boardStates[currentPlayer.position].owner && gameState.boardStates[currentPlayer.position].owner !== playerId ? (
                  <button
                    onClick={() => handleAction('PAY_RENT')}
                    className="bg-red-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:bg-red-700 flex items-center gap-2"
                  >
                    PAY RENT
                  </button>
                ) : (
                  <button
                    onClick={() => updateState({ ...gameState, turnPhase: 'MANAGE' })}
                    className="bg-gray-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg"
                  >
                    CONTINUE
                  </button>
                )}
              </>
            )}

            {isMyTurn && gameState.turnPhase === 'MANAGE' && (
              <button
                onClick={endTurn}
                className="bg-blue-900 text-white font-bold px-8 py-3 rounded-xl shadow-lg flex items-center gap-2"
              >
                END TURN <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* --- SIDEBAR PANEL --- */}
      <div className="flex-1 flex flex-col space-y-6 max-h-[800px]">
        {/* Room Header */}
        <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold text-gray-400 uppercase">Room Code</h2>
            <p className="text-xl font-mono font-bold text-blue-600 tracking-tighter">{gameState.roomCode}</p>
          </div>
          <div className="text-right">
            <h2 className="text-xs font-bold text-gray-400 uppercase">Sync Status</h2>
            <div className="flex items-center gap-1 text-green-500 text-sm font-bold">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Connected
            </div>
          </div>
        </div>

        {/* Players List */}
        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-200 flex-1 overflow-y-auto">
          <h3 className="text-sm font-black text-blue-900 uppercase mb-4 flex items-center gap-2">
            <User size={16} /> Players
          </h3>
          <div className="space-y-3">
            {gameState.players.map((p, idx) => (
              <div
                key={p.id}
                className={`p-3 rounded-xl border-2 transition-all ${idx === gameState.currentPlayerIndex ? 'border-blue-500 bg-blue-50 scale-[1.02]' : 'border-gray-100 bg-gray-50'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{p.token}</span>
                    <div>
                      <p className="font-black text-gray-800 text-sm leading-none">{p.name}</p>
                      <p className="text-xs text-blue-600 font-bold mt-1 tracking-tight flex items-center gap-1">
                        <Coins size={10} /> £{p.money}
                      </p>
                    </div>
                  </div>
                  {idx === gameState.currentPlayerIndex && (
                    <div className="bg-blue-500 text-white text-[10px] px-2 py-1 rounded-full font-bold animate-pulse">
                      PLAYING
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Game Log */}
        <div className="bg-blue-900 p-5 rounded-2xl shadow-xl text-white h-48 flex flex-col">
          <h3 className="text-xs font-black text-blue-300 uppercase mb-3 flex items-center gap-2">
            <History size={14} /> Game Activity
          </h3>
          <div className="flex-1 overflow-y-auto text-[11px] font-mono space-y-1.5 scrollbar-thin scrollbar-thumb-blue-700">
            {gameState.logs.map((log, i) => (
              <div key={i} className={`pb-1 border-b border-blue-800 ${i === 0 ? 'text-blue-200' : 'text-blue-400/70'}`}>
                {`> ${log}`}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonopolyApp;