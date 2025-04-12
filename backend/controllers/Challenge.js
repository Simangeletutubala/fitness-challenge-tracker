const Challenge = require("../models/Challenge");
const authMiddleware = require("../middleware/authMiddleware");
const getChallenges = async (req, res) => {
  const challenges = await Challenge.find({});
  res.json(challenges);
};

const createChallenge = async (req, res) => {
  const challenge = new Challenge({
    name: req.body.name,
    description: req.body.description,
    challenge_type: req.body.challenge_type,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    createdBy: req.user.userId,
  });
  try {
    await challenge.save();
    res.status(201).json(challenge);
  } catch (err) {
    res.status(400).json({ error: "Failed to create challenge" });
  }  
};

const updateChallenge = (req, res) => {
  Challenge.findOneAndUpdate(
    { _id: req.params.challengeID },
    {
      $set: {
        name: req.body.name,
        description: req.body.description,
        challenge_type: req.body.challenge_type,
        start_date: req.body.date,
        end_date: req.body.date,
      },
    },
    { new: true },
    (err, Challenge) => {
      if (err) {
        res.send(err);
      } else res.json(Challenge);
    }
  );
};

const deleteChallenge = (req, res) => {
  User.deleteOne({ _id: req.params.challengeID })
    .then(() => res.json({ message: "Challenge Deleted" }))
    .catch((err) => res.send(err));
};

module.exports = {
  getChallenges,
  createChallenge,
  updateChallenge,
  deleteChallenge,
};
