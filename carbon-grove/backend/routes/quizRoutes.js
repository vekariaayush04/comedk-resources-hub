const express = require('express');
const Quiz = require('../models/Quiz');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

// Admin: Add quiz questions
router.post('/add', verifyToken, async (req, res) => {
    try {
        const { question, options, correctAnswer } = req.body;
        const newQuiz = new Quiz({ question, options, correctAnswer });
        await newQuiz.save();
        res.json(newQuiz);
    } catch (error) {
        res.status(500).json({ msg: "Server Error" });
    }
});

// User: Answer quiz (for leaderboard)
router.post('/answer', verifyToken, async (req, res) => {
    const { quizId, answer } = req.body;
    try {
        const quiz = await Quiz.findById(quizId);
        if (!quiz) return res.status(400).json({ msg: "Quiz not found" });

        const isCorrect = quiz.correctAnswer === answer;
        if (isCorrect) {
            const user = await User.findById(req.user.id);
            user.points += 10; // add points
            await user.save();
        }

        res.json({ isCorrect });
    } catch (error) {
        res.status(500).json({ msg: "Server Error" });
    }
});

module.exports = router;
