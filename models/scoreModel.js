import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema(
    {
        matchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Match",
            required: true,
            unique: true
        },

        points: {
            playerA: { type: Number, default: 0 }, // 0,1,2,3 => 0,15,30,40
            playerB: { type: Number, default: 0 }
        },

        advantage: {
            type: String,
            enum: ["playerA", "playerB", null],
            default: null
        },

        sets: [
            {
                games: {
                    playerA: Number,
                    playerB: Number
                }
            }
        ],
        setScore: {
            playerA: { type: Number, default: 0 },
            playerB: { type: Number, default: 0 }
        },
        server: {
            type: String,
            enum: ["playerA", "playerB", null],
            default: "playerA" // starting server
        },
        winner: {
            type: String,
            enum: ["playerA", "playerB", null],
            default: null
        },
        status: {
            type: String,
            enum: ["live", "completed"],
            default: "live"
        }
    },
    { timestamps: true }
);

export default mongoose.model("Score", scoreSchema);
