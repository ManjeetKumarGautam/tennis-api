import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// -----------------------------------------
// Player Schema
// -----------------------------------------
const playerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    country_code: { type: Number, required: true },
    ranking: { type: Number, required: true },
    age: { type: Number, required: true },
    height: { type: String },
    weight: { type: String },
    hand: { type: String, enum: ["Right-handed", "Left-handed"] },
    backhand: { type: String, enum: ["One-handed", "Two-handed"] },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    grandSlams: { type: Number, default: 0 },
});

const Player = mongoose.model("Player", playerSchema);

// -----------------------------------------
// 20 Players Data
// -----------------------------------------
const players = [
    {
        "name": "Novak Djokovic",
        "country_code": 381,
        "ranking": 1,
        "age": 37,
        "height": "188 cm",
        "weight": "77 kg",
        "hand": "Right-handed",
        "backhand": "Two-handed",
        "wins": 1090,
        "losses": 220,
        "grandSlams": 24
    },
    {
        "name": "Carlos Alcaraz",
        "country_code": 34,
        "ranking": 2,
        "age": 21,
        "height": "183 cm",
        "weight": "74 kg",
        "hand": "Right-handed",
        "backhand": "Two-handed",
        "wins": 210,
        "losses": 55,
        "grandSlams": 2
    },
    {
        "name": "Daniil Medvedev",
        "country_code": 7,
        "ranking": 3,
        "age": 28,
        "height": "198 cm",
        "weight": "83 kg",
        "hand": "Right-handed",
        "backhand": "Two-handed",
        "wins": 330,
        "losses": 140,
        "grandSlams": 1
    },
    {
        "name": "Jannik Sinner",
        "country_code": 39,
        "ranking": 4,
        "age": 23,
        "height": "188 cm",
        "weight": "76 kg",
        "hand": "Right-handed",
        "backhand": "Two-handed",
        "wins": 190,
        "losses": 65,
        "grandSlams": 1
    },
    {
        "name": "Alexander Zverev",
        "country_code": 49,
        "ranking": 5,
        "age": 27,
        "height": "198 cm",
        "weight": "90 kg",
        "hand": "Right-handed",
        "backhand": "Two-handed",
        "wins": 400,
        "losses": 190,
        "grandSlams": 0
    },
    {
        "name": "Stefanos Tsitsipas",
        "country_code": 30,
        "ranking": 6,
        "age": 26,
        "height": "193 cm",
        "weight": "89 kg",
        "hand": "Right-handed",
        "backhand": "One-handed",
        "wins": 340,
        "losses": 170,
        "grandSlams": 0
    },
    {
        "name": "Andrey Rublev",
        "country_code": 7,
        "ranking": 7,
        "age": 26,
        "height": "188 cm",
        "weight": "75 kg",
        "hand": "Right-handed",
        "backhand": "Two-handed",
        "wins": 320,
        "losses": 180,
        "grandSlams": 0
    },
    {
        "name": "Holger Rune",
        "country_code": 45,
        "ranking": 8,
        "age": 21,
        "height": "188 cm",
        "weight": "77 kg",
        "hand": "Right-handed",
        "backhand": "Two-handed",
        "wins": 150,
        "losses": 70,
        "grandSlams": 0
    },
    {
        "name": "Casper Ruud",
        "country_code": 47,
        "ranking": 9,
        "age": 25,
        "height": "183 cm",
        "weight": "77 kg",
        "hand": "Right-handed",
        "backhand": "Two-handed",
        "wins": 260,
        "losses": 140,
        "grandSlams": 0
    },
    {
        "name": "Taylor Fritz",
        "country_code": 1,
        "ranking": 10,
        "age": 26,
        "height": "196 cm",
        "weight": "86 kg",
        "hand": "Right-handed",
        "backhand": "Two-handed",
        "wins": 240,
        "losses": 150,
        "grandSlams": 0
    },
    {
        "name": "Alex de Minaur",
        "country_code": 61,
        "ranking": 11,
        "age": 25,
        "height": "183 cm",
        "weight": "69 kg",
        "hand": "Right-handed",
        "backhand": "Two-handed",
        "wins": 230,
        "losses": 160,
        "grandSlams": 0
    },
    {
        "name": "Tommy Paul",
        "country_code": 1,
        "ranking": 12,
        "age": 27,
        "height": "185 cm",
        "weight": "82 kg",
        "hand": "Right-handed",
        "backhand": "Two-handed",
        "wins": 210,
        "losses": 170,
        "grandSlams": 0
    },
    {
        "name": "Hubert Hurkacz",
        "country_code": 48,
        "ranking": 13,
        "age": 27,
        "height": "196 cm",
        "weight": "81 kg",
        "hand": "Right-handed",
        "backhand": "Two-handed",
        "wins": 260,
        "losses": 180,
        "grandSlams": 0
    },
    {
        "name": "Grigor Dimitrov",
        "country_code": 359,
        "ranking": 14,
        "age": 33,
        "height": "191 cm",
        "weight": "81 kg",
        "hand": "Right-handed",
        "backhand": "One-handed",
        "wins": 420,
        "losses": 260,
        "grandSlams": 0
    },
    {
        "name": "Ben Shelton",
        "country_code": 1,
        "ranking": 15,
        "age": 22,
        "height": "193 cm",
        "weight": "88 kg",
        "hand": "Left-handed",
        "backhand": "Two-handed",
        "wins": 120,
        "losses": 70,
        "grandSlams": 0
    },
    {
        "name": "Frances Tiafoe",
        "country_code": 1,
        "ranking": 16,
        "age": 26,
        "height": "188 cm",
        "weight": "86 kg",
        "hand": "Right-handed",
        "backhand": "Two-handed",
        "wins": 240,
        "losses": 200,
        "grandSlams": 0
    },
    {
        "name": "Karen Khachanov",
        "country_code": 7,
        "ranking": 17,
        "age": 28,
        "height": "198 cm",
        "weight": "87 kg",
        "hand": "Right-handed",
        "backhand": "Two-handed",
        "wins": 300,
        "losses": 210,
        "grandSlams": 0
    },
    {
        "name": "Felix Auger-Aliassime",
        "country_code": 1,
        "ranking": 18,
        "age": 24,
        "height": "193 cm",
        "weight": "88 kg",
        "hand": "Right-handed",
        "backhand": "Two-handed",
        "wins": 220,
        "losses": 160,
        "grandSlams": 0
    },
    {
        "name": "Sebastian Korda",
        "country_code": 1,
        "ranking": 19,
        "age": 24,
        "height": "196 cm",
        "weight": "82 kg",
        "hand": "Right-handed",
        "backhand": "Two-handed",
        "wins": 150,
        "losses": 110,
        "grandSlams": 0
    },
    {
        "name": "Lorenzo Musetti",
        "country_code": 39,
        "ranking": 20,
        "age": 22,
        "height": "185 cm",
        "weight": "75 kg",
        "hand": "Right-handed",
        "backhand": "One-handed",
        "wins": 170,
        "losses": 130,
        "grandSlams": 0
    }
];


// -----------------------------------------
// Insert Function
// -----------------------------------------
const seedPlayers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");

        await Player.deleteMany();
        console.log("Old records deleted");

        await Player.insertMany(players);
        console.log("20 Tennis Players Inserted!");

        process.exit();
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

seedPlayers();
