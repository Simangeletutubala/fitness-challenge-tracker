const Leaderboard = require("../models/Leaderboard");
const Learderboard = require("../models/Leaderboard");

const getLeaderboards = async (req, res) => {
  const leaderboards = await Learderboard.find({});
  res.json(leaderboards);
};

const createLeaderboard = (req, res) => {
  const learderboard = new Leaderboard({
    leaderboard_id: req.body.leaderboard_id,
    challenge_id: req.body.challenge_id,
    user_id: req.body.user_id,
    score: req.body.score,
  });

  leaderboard.save((err, leaderboard) => {
    if (err) {
      res.send(err);
    }
    res.json(leaderboard);
  });
};

const updateLeaderboard = (req, res) => {
  Leaderboard.findOneAndUpdate(
    { _id: req.params.leaderboardID },
    {
      $set: {
        leaderboard_id: req.body.leaderboard_id,
        challenge_id: req.body.challenge_id,
        user_id: req.body.user_id,
        score: req.body.score,
      },
    },
    { new: true },
    (err, Leaderboard) => {
      if (err) {
        res.send(err);
      } else res.json(Leaderboard);
    }
  );
};

const deleteLeaderboard = (req, res) => {
  Leaderboard.deleteOne({ _id: req.params.leaderboardID })
    .then(() => res.json({ message: "Leaderboard Deleted" }))
    .catch((err) => res.send(err));
};

module.exports = {
  getLeaderboards,
  createLeaderboard,
  updateLeaderboard,
  deleteLeaderboard,
};
