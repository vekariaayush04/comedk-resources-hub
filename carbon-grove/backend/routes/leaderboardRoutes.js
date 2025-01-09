// routes/leaderboardRoutes.js
const express = require('express');
const { getLeaderboard } = require('../controllers/leaderboardController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

// Admin route to view leaderboard
router.get('/leaderboard', verifyToken, verifyAdmin, getLeaderboard);

module.exports = router;
