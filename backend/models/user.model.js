const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
      },
      username: {
        type: String,
        required: true,
        unique: true,
        trim: true
      },
      password: {
        type: String,
        required: true
      },
      examRank: {
        type: Number,
        default: null // You can set a default value or leave it as null initially
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
})

const User = mongoose.model('User', userSchema);

module.exports = User;