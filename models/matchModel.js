import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
    playerA: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
    playerB: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
    status: { type: String, default: "upcomming" },
    matchDateTime: { type: Date },
    matchInfo: {
        tournament: String,
        round: String,
        surface: String,
        court: String,
        umpire: String,
        startDate: Date,
    },

    statistics: {
        aces: {
            playerA: Number,
            playerB: Number
        },
        doubleFaults: {
            playerA: Number,
            playerB: Number
        },
        firstServePercentage: {
            playerA: Number,
            playerB: Number
        },
        winOnFirstServe: {
            playerA: Number,
            playerB: Number
        },
        winners: {
            playerA: Number,
            playerB: Number
        },
        unforcedErrors: {
            playerA: Number,
            playerB: Number
        },
        breakPointsSaved: {
            playerA: Number,
            playerB: Number
        }
    }
}, { timestamps: true });

export default mongoose.model("Match", matchSchema);
