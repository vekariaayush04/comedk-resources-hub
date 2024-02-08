// backend/routes/user.js
const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const zod = require("zod");
const User = require("../models/user.model")
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { loginController ,registerController} = require('../controllers/authController');

mongoose.connect("mongodb+srv://ayushrvekaria:0V2Xw5K2u8F6SvLu@cluster0.hf9nduf.mongodb.net/")

const signupBody = zod.object({
    username: zod.string(),
	email : zod.string().email(),
	password: zod.string()
})
router.post("/signup", registerController)
const signinBody = zod.object({
    email: zod.string().email(),
	password: zod.string()
})

router.post("/signin", loginController)

module.exports = router;