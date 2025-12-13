import { getDashboard } from "../services/dashboardService.js";

export const getDashboardData = async (req, res) => {
    try {
        const dashboard = await getDashboard();
        res.status(200).json(dashboard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
