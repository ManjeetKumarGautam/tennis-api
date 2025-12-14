import Player from "../models/playerModel.js";
import Match from "../models/matchModel.js";
import mongoose from "mongoose";

export const createPlayer = async (data) => {
    try {
        return await Player.create(data);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getPlayers = async () => {
    return await Player.find().sort({ wins: -1 });
};


// Utility: Get player by ID with last 5 matches
export const getPlayerById = async (playerId) => {
    if (!mongoose.Types.ObjectId.isValid(playerId)) {
        throw new Error("Invalid player ID");
    }

    // Fetch player
    const player = await Player.findById(playerId);
    if (!player) {
        throw new Error("Player not found");
    }

    // Fetch last 5 completed matches
    const matches = await Match.find({
        status: "completed",
        $or: [{ playerA: playerId }, { playerB: playerId }]
    })
        .sort({ createdAt: -1 })
        .limit(5);

    // Map matches to Win/Loss
    const last5Matches = matches.map(match => {
        const playerAId = match.playerA;
        const playerBId = match.playerB;

        // Determine winner (based on 'winners' statistic)
        const playerAWinners = match.statistics.winners.playerA || 0;
        const playerBWinners = match.statistics.winners.playerB || 0;
        const winnerId = playerAWinners > playerBWinners ? playerAId : playerBId;

        return {
            matchId: match._id,
            opponent: playerAId === playerId ? match.playerB : match.playerA,
            result: winnerId === playerId ? "Win" : "Loss",
            tournament: match.tournament,
            round: match.matchInfo.round,
            surface: match.matchInfo.surface,
            court: match.matchInfo.court,
            umpire: match.matchInfo.umpire,
            date: match.createdAt
        };
    });

    return {
        player,
        last5Matches
    };
};


export const updatePlayer = async (id, data) =>
    await Player.findByIdAndUpdate(id, data, { new: true });

export const deletePlayer = async (id) =>
    await Player.findByIdAndDelete(id);
