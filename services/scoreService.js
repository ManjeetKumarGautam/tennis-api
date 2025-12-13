import Score from "../models/scoreModel.js";
import Match from "../models/matchModel.js";



// export const updateScore = async (matchId, scoreData) => {
//     return await Score.findOneAndUpdate(
//         { matchId },
//         scoreData,
//         { new: true, upsert: true }
//     );
// };

export const getScore = async (matchId) =>
    await Score.findOne({ matchId });

const POINTS = ["0", "15", "30", "40"];

const nextPoint = (current) => {
    const idx = POINTS.indexOf(current);
    return idx < 3 ? POINTS[idx + 1] : "40";
};

export const updateScore = async (matchId, player) => {
    let score = await Score.findOne({ matchId });

    // Create score if not exists
    if (!score) {
        score = await Score.create({
            matchId,
            status: "live",
            sets: [{ gamesA: 0, gamesB: 0 }]
        });
    }

    if (score.status !== "live") {
        throw new Error("Match is not live");
    }

    const opponent = player === "playerA" ? "playerB" : "playerA";
    const p = score.points[player];
    const op = score.points[opponent];

    // 🔵 DEUCE & ADVANTAGE
    if (p === "40" && op === "40") {
        score.points[player] = "ADV";
    } else if (p === "ADV") {
        winGame(score, player);
    } else if (op === "ADV") {
        score.points[player] = "40";
        score.points[opponent] = "40";
    } else {
        score.points[player] = nextPoint(p);
    }

    await score.save();
    return score;
};

function winGame(score, player) {
    const setIndex = score.sets.length - 1;
    const set = score.sets[setIndex];

    if (player === "playerA") set.gamesA += 1;
    else set.gamesB += 1;

    // Reset points
    score.points.playerA = "0";
    score.points.playerB = "0";

    // Set win condition
    if (
        (set.gamesA >= 6 || set.gamesB >= 6) &&
        Math.abs(set.gamesA - set.gamesB) >= 2
    ) {
        score.sets.push({ gamesA: 0, gamesB: 0 });
    }
}