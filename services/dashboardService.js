import Match from "../models/matchModel.js";
import Score from "../models/scoreModel.js";
import Player from "../models/playerModel.js";

export const getDashboard = async () => {
    try {
        // --- Dates for today ---
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        // --- Fetch all counts and lists in parallel ---
        const [
            totalPlayers,
            totalMatches,
            liveMatchesCount,
            todayMatchesCount,
            liveMatches,
            upcomingMatches,
            completedMatches,
            topRankingPlayers,
        ] = await Promise.all([
            Player.countDocuments(),
            Match.countDocuments(),
            Match.countDocuments({ status: "live" }),
            Match.countDocuments({ matchDateTime: { $gte: todayStart, $lte: todayEnd } }),

            Match.find({ status: "live" })
                .populate("playerA", "name ranking country")
                .populate("playerB", "name ranking country")
                .sort({ matchDateTime: -1 }),

            Match.find({ status: "upcoming" })
                .populate("playerA", "name ranking country")
                .populate("playerB", "name ranking country")
                .sort({ matchDateTime: 1 }),

            Match.find({ status: "completed" })
                .populate("playerA", "name ranking country")
                .populate("playerB", "name ranking country")
                .sort({ updatedAt: -1 })
                .limit(5),

            Player.find({})
                .sort({ ranking: 1 })
                .limit(5)
                .select("name ranking country wins losses"),
        ]);

        // --- Recent Match Results ---
        const recentMatchResults = await Promise.all(
            completedMatches.map(async (match) => {
                if (!match) return null;

                const score = await Score.findOne({ matchId: match._id });
                if (!score) return null;

                let winner = null;
                let loser = null;

                if (score.winner === "playerA" && match.playerA && match.playerB) {
                    winner = match.playerA.name;
                    loser = match.playerB.name;
                } else if (score.winner === "playerB" && match.playerA && match.playerB) {
                    winner = match.playerB.name;
                    loser = match.playerA.name;
                }

                return {
                    matchId: match._id,
                    tournament: match.matchInfo?.tournament || "",
                    round: match.matchInfo?.round || "",
                    winner,
                    loser,
                    setScore: score.setScore || null,
                    completedAt: match.updatedAt,
                };
            })
        );

        return {
            stats: {
                totalPlayers,
                totalMatches,
                liveMatches: liveMatchesCount,
                todayMatches: todayMatchesCount,
            },
            liveMatches,
            upcomingMatches,
            recentMatchResults: recentMatchResults.filter(Boolean), // remove nulls
            topRankingPlayers,
        };
    } catch (error) {
        throw new Error(error.message);
    }
};
