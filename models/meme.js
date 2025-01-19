const mongoose = require('mongoose');

const memeSchema = new mongoose.Schema({
    videoUrl: { type: String, required: true },
    votes: { type: Number, default: 0 },
});

module.exports = mongoose.model('Meme', memeSchema);
