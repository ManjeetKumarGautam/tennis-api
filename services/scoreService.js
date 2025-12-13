import Score from "../models/scoreModel.js";


export const addPointService = async (matchId, player) => {
    let score = await Score.findOne({ matchId });

    if (!score) {
        score = await Score.create({
            matchId,
            sets: [{ games: { playerA: 0, playerB: 0 } }],
            setScore: { playerA: 0, playerB: 0 }
        });
    }

    if (score.status === "completed") return score;

    const pKey = player === "A" ? "playerA" : "playerB";
    const oKey = player === "A" ? "playerB" : "playerA";

    const currentSet = score.sets[score.sets.length - 1];

    // ================================
    // GAME LOGIC
    // ================================
    if (score.points.playerA >= 3 && score.points.playerB >= 3) {
        if (!score.advantage) {
            score.advantage = pKey;
        } else if (score.advantage === pKey) {
            winGame(currentSet, score, pKey);
        } else {
            score.advantage = null;
        }
    } else {
        score.points[pKey] += 1;
        if (score.points[pKey] >= 4) {
            winGame(currentSet, score, pKey);
        }
    }

    await score.save();
    return score;
};

// ================================
// GAME → SET LOGIC
// ================================
function winGame(currentSet, score, pKey) {
    currentSet.games[pKey] += 1;
    resetPoints(score);

    const gA = currentSet.games.playerA;
    const gB = currentSet.games.playerB;

    // Win Set (6 games, 2 lead)
    if ((gA >= 6 || gB >= 6) && Math.abs(gA - gB) >= 2) {
        winSet(score, gA > gB ? "playerA" : "playerB");
    }
}

// ================================
// SET → MATCH LOGIC
// ================================
function winSet(score, setWinner) {
    score.setScore[setWinner] += 1;

    // Match win (Best of 3)
    if (score.setScore[setWinner] === 2) {
        score.status = "completed";
        score.winner = setWinner;
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