const mongoose = require("mongoose");

const ProgressLogSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    challenge_id: { type: String, required: true },
    activity_type: { type: String, required: true },
    value: { type: Number, required: true },   
}, { timestamps: true });

module.exports = mongoose.model("ProgressLog", ProgressLogSchema);
