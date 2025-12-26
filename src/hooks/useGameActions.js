import { useState } from 'react';

export const useGameActions = (gameState, updateState, playerId) => {
    const addLog = (msg) => [msg, ...gameState.logs].slice(0, 10);

    // Rule: Must own all properties in a color-group to build [cite: 77, 131]
    const checkMonopoly = (group) => {
        const groupProperties = gameState.boardStates.filter(p => p.group === group);
        return groupProperties.every(p => p.owner === playerId);
    };

    // Rule: Building must be done evenly [cite: 133]
    const canBuildOnProperty = (property) => {
        if (!checkMonopoly(property.group)) return { canBuild: false, reason: "You don't own the monopoly." };

        const groupProperties = gameState.boardStates.filter(p => p.group === property.group);
        const minHouses = Math.min(...groupProperties.map(p => p.houses));

        if (property.houses > minHouses) {
            return { canBuild: false, reason: "You must build evenly across the group." };
        }
        if (property.houses >= 5) return { canBuild: false, reason: "Maximum buildings reached." };

        return { canBuild: true };
    };

    const handleBuild = async (propertyId) => {
        const board = [...gameState.boardStates];
        const players = [...gameState.players];
        const currentPlayer = players[gameState.currentPlayerIndex];
        const propertyIndex = board.findIndex(p => p.id === propertyId);
        const property = board[propertyIndex];

        const validation = canBuildOnProperty(property);
        if (!validation.canBuild) return alert(validation.reason);

        if (currentPlayer.money < property.houseCost) return alert("Not enough money.");

        // Update state
        currentPlayer.money -= property.houseCost;
        board[propertyIndex].houses += 1;
        if (board[propertyIndex].houses === 5) board[propertyIndex].hotel = true;

        await updateState({
            ...gameState,
            players,
            boardStates: board,
            logs: addLog(`${currentPlayer.name} built a house on ${property.name}`)
        });
    };

    const calculateRent = (property, players, boardStates, diceTotal) => {
        const owner = players.find(p => p.id === property.owner);
        const ownerProperties = boardStates.filter(p => p.owner === owner.id);

        // 1. Stations Logic
        if (property.type === 'station') {
            const stationsOwned = ownerProperties.filter(p => p.type === 'station').length;
            const stationRents = [25, 50, 100, 200];
            return stationRents[stationsOwned - 1];
        }

        // 2. Utilities Logic
        if (property.type === 'utility') {
            const utilitiesOwned = ownerProperties.filter(p => p.type === 'utility').length;
            const multiplier = utilitiesOwned === 2 ? 10 : 4;
            return multiplier * diceTotal;
        }

        // 3. Site (Standard Property) Logic
        if (property.houses === 0) {
            const isMonopoly = boardStates
                .filter(p => p.group === property.group)
                .every(p => p.owner === owner.id && !p.mortgaged);

            // Rule: Double rent on unimproved sites if whole group is owned 
            return isMonopoly ? property.rent[0] * 2 : property.rent[0];
        }

        // Houses/Hotel rent [cite: 84]
        return property.rent[property.houses];
    };

    return { handleBuild, checkMonopoly, calculateRent };
};