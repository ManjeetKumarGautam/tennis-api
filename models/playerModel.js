import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    counrty_code: { type: Number, required: true },
    ranking: { type: Number, required: true },
    age: { type: Number, required: true },
    height: { type: String },
    weight: { type: String },
    hand: { type: String, enum: ["Right-handed", "Left-handed"] },
    backhand: { type: String, enum: ["One-handed", "Two-handed"] },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    grandSlams: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Player", playerSchema);
