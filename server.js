import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";

// Import combined routes
import router from "./routes/index.js";

dotenv.config();

const app = express();

// -------------------------------------------
// MIDDLEWARE
// -------------------------------------------
app.use(cors());
app.use(express.json());

// -------------------------------------------
// DATABASE
// -------------------------------------------
connectDB();

// -------------------------------------------
// ROUTES
// -------------------------------------------
app.use("/api", router);

app.get("/", (req, res) => {
    res.send("<h1>Tennis Score API Running...</h1>");
});

// -------------------------------------------
// SOCKET SERVER
// -------------------------------------------
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*", // change in production
        methods: ["GET", "POST", "PUT"]
    }
});

// Socket connection
io.on("connection", (socket) => {
    console.log("🔌 Client connected:", socket.id);

    // Join a specific match room
    socket.on("joinMatch", (matchId) => {
        socket.join(matchId);
        console.log(`🎾 Socket ${socket.id} joined match ${matchId}`);
    });

    socket.on("disconnect", () => {
        console.log("❌ Client disconnected:", socket.id);
    });
});

// -------------------------------------------
// EXPORT IO (IMPORTANT)
// -------------------------------------------
export { io };

// -------------------------------------------
// START SERVER
// -------------------------------------------
const PORT = process.env.PORT || 8000;

httpServer.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
