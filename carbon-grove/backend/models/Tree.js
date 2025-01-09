const mongoose = require('mongoose');

const treeSchema = new mongoose.Schema({
    type: { type: String, required: true, unique: true }, 
    pointsRequired: { type: Number, required: true },
});

module.exports = mongoose.model('Tree', treeSchema);
