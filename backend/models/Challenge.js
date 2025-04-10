const mongoose = require("mongoose");

const ChallengeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  challenge_type: { type: String, required: true },
  start_date: { type: Date, required: true } ,
  end_date: { type: Date, required: true } ,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Challenge", ChallengeSchema);
