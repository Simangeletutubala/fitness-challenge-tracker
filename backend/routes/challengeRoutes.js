const express = require("express");
const Challenge = require("../models/Challenge");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create a challenge
router.post("/", authMiddleware, async (req, res) => {
  const { title, description } = req.body;
  const challenge = new Challenge({ title, description, createdBy: req.user.userId });

  try {
    await challenge.save();
    res.status(201).json(challenge);
  } catch (err) {
    res.status(400).json({ error: "Failed to create challenge" });
  }
});

// Get all challenges
router.get("/", async (req, res) => {
  const challenges = await Challenge.find().populate("createdBy", "name");
  res.json(challenges);
});

module.exports = router;
