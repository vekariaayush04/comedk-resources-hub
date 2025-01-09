// controllers/leaderboardController.js
const User = require('../models/User');

// Get Leaderboard: Sorted by points
const getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await User.find()
            .sort({ points: -1 })  // Sort by points in descending order
            .select('username points')  // Select only the username and points to reduce data size
            .limit(10);
        res.json(leaderboard);
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' });
    }
};

module.exports = { getLeaderboard };
