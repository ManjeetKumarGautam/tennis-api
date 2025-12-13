import express from "express";

import playerRoutes from "./playerRoutes.js";
import matchRoutes from "./matchRoutes.js";
import scoreRoutes from "./scoreRoutes.js";
import userRoutes from "./userRoutes.js"

const router = express.Router();

// Register all routes
router.use("/players", playerRoutes);
router.use("/matches", matchRoutes);
router.use("/scores", scoreRoutes);
router.use("/users", userRoutes);

export default router;
