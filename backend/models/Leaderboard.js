const mongoose = require("mongoose");

const LeaderboardSchema = new mongoose.Schema({
    challenge_id: { type: String, required: true },
    user_id: { type: String, required: true },
    score: { type: String, required: true },

});

module.exports = mongoose.model("Learderboard", LeaderboardSchema);