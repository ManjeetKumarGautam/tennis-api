import express from "express";
import { addPoint, getScore } from "../controllers/scoreController.js";

const router = express.Router();

router.post("/:matchId/point", addPoint);
router.get("/:matchId", getScore);

export default router;
