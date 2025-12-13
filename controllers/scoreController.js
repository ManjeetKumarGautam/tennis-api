import { updateScore, getScore } from "../services/scoreService.js";


export const updateMatchScore = async (req, res) => {
    const { matchId } = req.params;
    const { player } = req.body;

    try {
        const updatedMatch = await updateScore(matchId, player);
        return res.json(updatedMatch); // send response here
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};
// export const updateScoreForSocket = async (matchId, player) => {
//   const updatedMatch = await updateMatchScore(matchId, player);

//   // Emit to all connected clients in the room
//   const io = getIO();
//   io.to(matchId).emit("scoreUpdate", updatedMatch);

//   // THIS LINE IS WRONG FOR SOCKET:
//   return res.json(updatedMatch); // ❌ res is undefined
// };
export const getMatchScore = async (req, res) => {
    const score = await getScore(req.params.matchId);
    res.json(score);
};
