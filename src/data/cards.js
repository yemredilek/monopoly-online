export const CHANCE_CARDS = [
    { id: 'c1', text: "Advance to GO", action: 'MOVE', value: 0 },
    { id: 'c2', text: "Advance to Trafalgar Square", action: 'MOVE', value: 24 },
    { id: 'c3', text: "Go back 3 spaces", action: 'MOVE_RELATIVE', value: -3 },
    { id: 'c4', text: "Bank pays you dividend of £50", action: 'RECEIVE', value: 50 },
    { id: 'c5', text: "Go to Jail", action: 'JAIL' },
    { id: 'c6', text: "Get Out of Jail Free", action: 'GOJF' },
    { id: 'c7', text: "Make general repairs: £25 per house, £100 per hotel", action: 'REPAIRS', house: 25, hotel: 100 },
    // ... (Full deck of 16)
];

export const COMMUNITY_CHEST_CARDS = [
    { id: 'cc1', text: "Advance to GO", action: 'MOVE', value: 0 },
    { id: 'cc2', text: "Bank error in your favour: Collect £200", action: 'RECEIVE', value: 200 },
    { id: 'cc3', text: "Doctor's fee: Pay £50", action: 'PAY', value: 50 },
    { id: 'cc4', text: "It is your birthday: Collect £10 from every player", action: 'BIRTHDAY', value: 10 },
    { id: 'cc5', text: "Get Out of Jail Free", action: 'GOJF' },
    // ... (Full deck of 16)
];