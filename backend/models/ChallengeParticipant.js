const mongoose = require("mongoose");

const ChallengeParticipantSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    challenge_id: { type: String, required: true },
    joined_at: { type: Date, required: true },
});

module.exports = mongoose.model("ChallengeParticipant", ChallengeParticipantSchema);
