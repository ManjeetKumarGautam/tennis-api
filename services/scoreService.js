import Score from "../models/scoreModel.js";
import Match from "../models/matchModel.js";
import Player from "../models/playerModel.js";

export const addPointService = async (matchId, player) => {
    let score = await Score.findOne({ matchId });

    // Create score if not exists
    if (!score) {
        score = await Score.create({
            matchId,
            points: { playerA: 0, playerB: 0 },
            sets: [{ games: { playerA: 0, playerB: 0 } }],
            setScore: { playerA: 0, playerB: 0 }
        });

        // Mark match as live
        await Match.findByIdAndUpdate(matchId, { status: "live" });
    }

    if (score.status === "completed") return score;

    const pKey = player === "A" ? "playerA" : "playerB";
    const currentSet = score.sets[score.sets.length - 1];

    // ================================
    // GAME LOGIC
    // ================================
    if (score.points.playerA >= 3 && score.points.playerB >= 3) {
        if (!score.advantage) {
            score.advantage = pKey;
        } else if (score.advantage === pKey) {
            await winGame(score, currentSet, pKey);
        } else {
            score.advantage = null;
        }
    } else {
        score.points[pKey] += 1;
        if (score.points[pKey] >= 4) {
            await winGame(score, currentSet, pKey);
        }
    }

    await score.save();
    return score;
};
// ================================
// GAME → SET LOGIC
// ================================
async function winGame(score, currentSet, pKey) {
    currentSet.games[pKey] += 1;
    resetPoints(score);

    // -----------------
    // SWITCH SERVER
    // -----------------
    score.server = score.server === "playerA" ? "playerB" : "playerA";

    const gA = currentSet.games.playerA;
    const gB = currentSet.games.playerB;

    // Win set (6 games, 2 lead)
    if ((gA >= 6 || gB >= 6) && Math.abs(gA - gB) >= 2) {
        const setWinner = gA > gB ? "playerA" : "playerB";
        await winSet(score, setWinner);
    }
}


// ================================
// SET → MATCH LOGIC
// ================================
async function winSet(score, setWinner) {
    score.setScore[setWinner] += 1;

    // 🏆 MATCH COMPLETED (BEST OF 3)
    if (score.setScore[setWinner] === 2) {
        score.status = "completed";
        score.winner = setWinner;

        // INCREMENT WIN COUNT OF WINNING PLAYER
        const winnerPlayerId = setWinner === "playerA" ? score.matchId.playerA : score.matchId.playerB;

        // Note: We need to fetch the match first to get player IDs
        const match = await Match.findById(score.matchId);
        if (match) {
            const winnerId = setWinner === "playerA" ? match.playerA : match.playerB;
            await Player.findByIdAndUpdate(winnerId, { $inc: { wins: 1 } });
        }

        // UPDATE MATCH MODEL
        await Match.findByIdAndUpdate(score.matchId, {
            status: "completed",
            winner: setWinner
        });
        return;
    }

    // Start new set
    score.sets.push({
        games: { playerA: 0, playerB: 0 }
    });
}


// ================================
// RESET POINTS
// ================================
function resetPoints(score) {
    score.points.playerA = 0;
    score.points.playerB = 0;
    score.advantage = null;
}


export const getScoreService = async (matchId) => {
    return await Score.findOne({ matchId }).populate("matchId");
};