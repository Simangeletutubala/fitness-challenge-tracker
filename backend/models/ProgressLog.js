const mongoose = require("mongoose");

const ProgressLogSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    challenge_id: { type: String, required: true },
    activity_type: { type: String, required: true },
    value: { type: String, required: true },
    logged_at: { type: Date, required: true },
});

module.exports = mongoose.model("ProgressLogs", ProgressLogSchema);
