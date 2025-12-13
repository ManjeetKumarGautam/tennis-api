import {
    createPlayer, getPlayers, getPlayerById,
    updatePlayer, deletePlayer
} from "../services/playerService.js";

export const addPlayer = async (req, res) => {
    const player = await createPlayer(req.body);
    res.json(player);
};

export const getAllPlayers = async (req, res) => {
    const players = await getPlayers();
    res.json(players);
};

export const getSinglePlayer = async (req, res) => {
    const player = await getPlayerById(req.params.id);
    res.json(player);
};

export const editPlayer = async (req, res) => {
    const player = await updatePlayer(req.params.id, req.body);
    res.json(player);
};

export const removePlayer = async (req, res) => {
    await deletePlayer(req.params.id);
    res.json({ message: "Player deleted" });
};
