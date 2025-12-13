import Match from "../models/matchModel.js";
import Player from "../models/playerModel.js";
import Score from "../models/scoreModel.js";
import { generateRandomMatches } from "../utils/generateMatches.js";

// Create Match
export const createMatch = async (data) => {
    try {
        return await Match.create(data);
    } catch (error) {
        throw new Error(error.message);
    }
};

// Get all matches
export const getAllMatches = async () => {
    try {
        return await Match.find().populate("playerA playerB");
    } catch (error) {
        throw new Error(error.message);
    }
};

// Get live matches
export const getLiveMatches = async () => {
    try {


        return await Match.find({ status: "live" }).populate("playerA playerB");
    } catch (error) {
        throw new Error(error.message);
    }
};

// Update match status
export const updateMatchStatus = async (id, status) => {
    try {
        return await Match.findByIdAndUpdate(id, { status }, { new: true });
    } catch (error) {
        throw new Error(error.message);
    }
};

// Get match by ID
export const getMatchById = async (id) => {
    try {

        const match = await Match
            .findById(id)
            .populate("playerA playerB")
            .lean(); // convert to plain object

        const score = await Score
            .findOne({ matchId: id })
            .lean();

        return {
            ...match,
            score
        };

        // return await Match.findById(id).populate("playerA playerB");

    } catch (error) {
        throw new Error(error.message);
    }
};

// Auto generate matches
export const autoGenerateMatchesService = async () => {
    try {
        const players = await Player.find().lean();
        if (players.length < 2) {
            throw new Error("Not enough players");
        }

        const matches = generateRandomMatches(players);

        await Match.insertMany(matches);

        return matches;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteMatch = async (id) =>
    await Match.findByIdAndDelete(id);