// utils/generateMatches.js
export const generateRandomMatches = (players) => {
    let matches = [];

    // Shuffle players
    const shuffled = players.sort(() => 0.5 - Math.random());

    // Pair players
    for (let i = 0; i < shuffled.length - 1; i += 2) {
        matches.push({
            playerA: shuffled[i]._id,
            playerB: shuffled[i + 1]._id,
            tournament: "Australian Open",
            status: "scheduled"
        });
    }

    return matches;
};


