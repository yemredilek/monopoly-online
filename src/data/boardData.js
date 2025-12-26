export const INITIAL_PLAYER_MONEY = 1500;

export const TOKENS = ['🏎️', '🎩', '🐕', '🚢', '🦖', '💡'];

export const COLORS = {
    brown: 'bg-[#955436]',
    lightblue: 'bg-[#aae0fa]',
    pink: 'bg-[#d93a96]',
    orange: 'bg-[#f7941d]',
    red: 'bg-[#ed1b24]',
    yellow: 'bg-[#fef200]',
    green: 'bg-[#1fb25a]',
    darkblue: 'bg-[#0072bb]',
};

export const BOARD_DATA = [
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

export const getInitialState = (roomCode) => ({
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
    turnPhase: 'LOBBY',
    dice: [1, 1],
    doublesCount: 0,
    logs: ["Welcome to Monopoly Online!"],
    lastUpdate: Date.now(),
    gameStarted: false,
    winner: null,
    auction: {
        propertyId: null,
        highestBid: 0,
        highestBidder: null,
        active: false
    }
});