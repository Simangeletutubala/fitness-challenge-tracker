const Leaderboard = require("../models/Leaderboard");
const User = require("../models/User");
const Challenge = require("../models/Challenge");
const getLeaderboards = async (req, res) => {
  const leaderboards = await Leaderboard.find({});
  let returnValue = [];
  for (let index = 0; index < leaderboards.length; index++) {
    const leaderboardItem = leaderboards[index];
    const challenge = (await Challenge.find({_id : leaderboardItem.challenge_id}))[0];
    const user = (await User.find({_id : leaderboardItem.user_id}))[0];
    if (user && challenge) {
      if(user){             
        returnValue.push({
          user_id: user._id,
          name: user.name,
          challenge_id: challenge._id,
          challenge_name: challenge.name,
          points: leaderboardItem.points
        });
      } 
    }
  }

  res.json(returnValue);  

};

const createLeaderboard = (req, res) => {

  const leaderboard = new Leaderboard({
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
