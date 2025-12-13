import express from "express";
import {
    updateMatchScore,
    getMatchScore
} from "../controllers/scoreController.js";

const router = express.Router();

router.post("/:matchId/point", updateMatchScore);
router.get("/:matchId", getMatchScore);

export default router;
