// 1. Check for Monopoly
const checkMonopoly = (playerId, group, boardStates) => {
    const groupProperties = boardStates.filter(p => p.group === group);
    return groupProperties.every(p => p.owner === playerId);
};

// 2. Updated Action: Build House
const handleBuild = async (propertyId) => {
    const players = [...gameState.players];
    const board = [...gameState.boardStates];
    const currentPlayer = players[gameState.currentPlayerIndex];
    const property = board.find(p => p.id === propertyId);

    if (!checkMonopoly(currentPlayer.id, property.group, board)) {
        return alert("You must own all properties of this color to build.");
    }

    if (currentPlayer.money >= property.houseCost && property.houses < 5) {
        currentPlayer.money -= property.houseCost;
        property.houses += 1;
        if (property.houses === 5) property.hotel = true;

        await updateState({
            ...gameState,
            players,
            boardStates: board,
            logs: addLog(`${currentPlayer.name} built on ${property.name}`)
        });
    }
};

// 3. Trade Logic: Propose
const proposeTrade = async (targetPlayerId, offer) => {
    // offer: { myMoney: 0, myProps: [], targetMoney: 0, targetProps: [] }
    await updateState({
        ...gameState,
        tradeOffer: {
            from: playerId,
            to: targetPlayerId,
            ...offer,
            status: 'PENDING'
        },
        logs: addLog("A trade has been proposed!")
    });
};

const PropertyDetails = ({ space, onClose, onBuild }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className={`h-24 ${COLORS[space.group]} flex items-center justify-center p-4 text-center`}>
                <h2 className="text-white text-2xl font-black uppercase drop-shadow-md">{space.name}</h2>
            </div>
            <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm font-bold text-gray-600">
                    <div className="bg-gray-50 p-3 rounded-lg border">
                        <p className="text-[10px] text-gray-400 uppercase">Rent</p>
                        <p className="text-lg">£{space.rent[space.houses]}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border">
                        <p className="text-[10px] text-gray-400 uppercase">Houses</p>
                        <p className="text-lg">{space.houses < 5 ? space.houses : '1 Hotel'}</p>
                    </div>
                </div>

                {onBuild && (
                    <button
                        onClick={() => onBuild(space.id)}
                        className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition flex items-center justify-center gap-2"
                    >
                        <Home size={18} /> BUILD HOUSE (£{space.houseCost})
                    </button>
                )}

                <button onClick={onClose} className="w-full text-gray-400 font-bold py-2">CLOSE</button>
            </div>
        </div>
    </div>
);

export default {checkMonopoly, handleBuild, proposeTrade, PropertyDetails};