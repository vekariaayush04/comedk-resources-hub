// routes/adminRoutes.js
const express = require('express');
const User = require('../models/User');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

// Admin: Get all users
router.get('/users', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ msg: "Server Error" });
    }
});

module.exports = router;
