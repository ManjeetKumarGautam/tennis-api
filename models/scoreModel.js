import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema(
    {
        matchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Match",
            required: true,
            unique: true
        },

        status: {
            type: String,
            enum: ["scheduled", "live", "completed"],
            default: "scheduled"
        },

        points: {
            playerA: {
                type: String,
                enum: ["0", "15", "30", "40", "ADV"],
                default: "0"
            },
            playerB: {
                type: String,
                enum: ["0", "15", "30", "40", "ADV"],
                default: "0"
            }
        },

        sets: [
            {
                gamesA: { type: Number, default: 0 },
                gamesB: { type: Number, default: 0 }
            }
        ],

        tieBreak: {
            active: { type: Boolean, default: false },
            playerA: { type: Number, default: 0 },
            playerB: { type: Number, default: 0 }
        },

        winner: {
            type: String,
            enum: ["playerA", "playerB"],
            default: null
        }
    },
    { timestamps: true }
);

export default mongoose.model("Score", scoreSchema);
