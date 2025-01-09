const mongoose = require('mongoose');

const ecoActivitySchema = new mongoose.Schema({
    activityType: { type: String, required: true }, // e.g., 'imageUpload', 'quizAnswer'
    description: { type: String }, // Optional description for the activity
    pointsEarned: { type: Number, default: 0 }, // Points earned for the activity
    timestamp: { type: Date, default: Date.now } // Date of activity
});

const redeemedTreeSchema = new mongoose.Schema({
    treeType: { type: String, required: true }, // Type of tree purchased
    pointsUsed: { type: Number, required: true }, // Points deducted for the purchase
    timestamp: { type: Date, default: Date.now } // Purchase timestamp
});

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'] // Email validation
    },
    password: { 
        type: String, 
        required: true,
        minlength: 6 // Minimum password length
    },
    role: { 
        type: String, 
        default: "user", 
        enum: ['user', 'admin'] // Enforce roles
    },
    points: { 
        type: Number, 
        default: 25 // Initial points for registration
    },
    ecoActivities: [ecoActivitySchema], // Store user activity details
    redeemedTrees: [redeemedTreeSchema], // Store virtual garden tree purchases
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

module.exports = mongoose.model('User', userSchema);
