import Score from "../models/scoreModel.js";
import Match from "../models/matchModel.js";
import Player from "../models/playerModel.js";


export const addPointService = async (matchId, player, eventType = "point") => {
    let score = await Score.findOne({ matchId });

    // -----------------------------
    // CREATE SCORE IF NOT EXISTS
    // -----------------------------
    if (!score) {
        score = await Score.create({
            matchId,
            server: "playerA",
            points: { playerA: 0, playerB: 0 },
            sets: [{ games: { playerA: 0, playerB: 0 } }],
            setScore: { playerA: 0, playerB: 0 }
        });

        await Match.findByIdAndUpdate(matchId, { status: "live" });
    }

    if (score.status === "completed") return score;

    const pKey = player === "A" ? "playerA" : "playerB";
    const opponentKey = pKey === "playerA" ? "playerB" : "playerA";
    const currentSet = score.sets[score.sets.length - 1];

    // -----------------------------
    // VALIDATION
    // -----------------------------
    if (eventType === "doubleFault" && score.server !== pKey) {
        throw new Error("Only server can commit a double fault");
    }

    // -----------------------------
    // WHO WINS THE POINT?
    // -----------------------------
    let pointWinnerKey = pKey;

    if (eventType === "doubleFault") {
        pointWinnerKey = opponentKey;
    }

    // -----------------------------
    // POINT / GAME LOGIC
    // -----------------------------
    if (score.points.playerA >= 3 && score.points.playerB >= 3) {
        // DEUCE
        if (!score.advantage) {
            score.advantage = pointWinnerKey;
        } else if (score.advantage === pointWinnerKey) {
            await winGame(score, currentSet, pointWinnerKey);
        } else {
            score.advantage = null;
        }
    } else {
        score.points[pointWinnerKey] += 1;

        if (score.points[pointWinnerKey] >= 4) {
            await winGame(score, currentSet, pointWinnerKey);
        }
    }

    await score.save();
    return score;
};

// ================================
// GAME → SET LOGIC
// ================================
async function winGame(score, currentSet, winnerKey) {
    currentSet.games[winnerKey] += 1;

    // reset points
    score.points.playerA = 0;
    score.points.playerB = 0;
    score.advantage = null;

    // switch server
    score.server = score.server === "playerA" ? "playerB" : "playerA";

    const gA = currentSet.games.playerA;
    const gB = currentSet.games.playerB;

    // win set (6 games, 2 lead)
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

    // BEST OF 3
    if (score.setScore[setWinner] === 2) {
        score.status = "completed";
        score.winner = setWinner;

        const match = await Match.findById(score.matchId);

        if (match) {
            const winnerId =
                setWinner === "playerA" ? match.playerA : match.playerB;

            const loserId =
                setWinner === "playerA" ? match.playerB : match.playerA;

            await Player.findByIdAndUpdate(winnerId, {
                $inc: { wins: 1 }
            });

            await Player.findByIdAndUpdate(loserId, {
                $inc: { losses: 1 }
            });
        }

        await Match.findByIdAndUpdate(score.matchId, {
            status: "completed",
            winner: setWinner
        });

        return;
    }

    // new set
    score.sets.push({
        games: { playerA: 0, playerB: 0 }
    });
}




export const getScoreService = async (matchId) => {
    return await Score.findOne({ matchId }).populate("matchId");
};