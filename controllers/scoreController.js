import { addPointService, getScoreService } from "../services/scoreService.js";
import { io } from "../server.js";

export const addPoint = async (req, res) => {
    try {
        const { matchId } = req.params;
        const { player } = req.body; // "A" or "B"

        const score = await addPointService(matchId, player);

        // 🔴 LIVE SOCKET UPDATE
        io.to(matchId).emit("scoreUpdated", score);

        res.status(200).json({
            success: true,
            data: score
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getScore = async (req, res) => {
    try {
        const { matchId } = req.params;

        const score = await getScoreService(matchId);

        if (!score) {
            return res.status(404).json({
                success: false,
                message: "Score not found"
            });
        }

        res.status(200).json({
            success: true,
            data: score
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};