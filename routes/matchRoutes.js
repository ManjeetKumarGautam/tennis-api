import express from "express";
import {
    addMatch,
    allMatches,
    liveMatches,
    changeMatchStatus,
    singleMatch,
    autoGenerateMatches,
    deleteMatchById
} from "../controllers/matchController.js";

const router = express.Router();

router.post("/", addMatch);
router.get("/", allMatches);
router.get("/live", liveMatches);
router.get("/:id", singleMatch);
router.put("/:id/status", changeMatchStatus);
router.post("/generate", autoGenerateMatches);
router.delete("/:id", deleteMatchById);

export default router;
