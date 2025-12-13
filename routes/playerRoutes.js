import express from "express";
import {
    addPlayer, getAllPlayers, getSinglePlayer,
    editPlayer, removePlayer
} from "../controllers/playerController.js";

const router = express.Router();

router.post("/", addPlayer);
router.get("/", getAllPlayers);
router.get("/:id", getSinglePlayer);
router.put("/:id", editPlayer);
router.delete("/:id", removePlayer);

export default router;
