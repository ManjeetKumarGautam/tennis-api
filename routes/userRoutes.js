import express from "express";
import { registerUser, loginUserController, getProfile } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUserController);
router.get("/profile", authMiddleware, getProfile);

export default router;
