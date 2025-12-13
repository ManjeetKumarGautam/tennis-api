import {
    createMatch, getAllMatches, getLiveMatches,
    updateMatchStatus, getMatchById, autoGenerateMatchesService, deleteMatch
} from "../services/matchService.js";

export const addMatch = async (req, res) => {
    const match = await createMatch(req.body);
    res.json(match);
};

export const allMatches = async (req, res) => {
    res.json(await getAllMatches());
};

export const liveMatches = async (req, res) => {
    res.json(await getLiveMatches());
};

export const changeMatchStatus = async (req, res) => {
    const updated = await updateMatchStatus(req.params.id, req.body.status);
    res.json(updated);
};

export const singleMatch = async (req, res) => {
    res.json(await getMatchById(req.params.id));
};


export const autoGenerateMatches = async (req, res) => {

    const matches = await autoGenerateMatchesService();
    res.json(matches);
};

export const deleteMatchById = async (req, res) => {
    await deleteMatch(req.params.id);
    res.json({ message: "Match deleted" });
};
