import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import connectDB from "./config/db.js";

// Import combined routes
import router from "./routes/index.js";

dotenv.config();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// API routes
app.use("/api", router);

// Default route
app.get("/", (req, res) => {
    res.send("<h1>Tennis Score API Running...</h1>");
});

// -------------------------------------------
// START SERVER
// -------------------------------------------
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
