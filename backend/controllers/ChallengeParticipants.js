const ChallengeParticipant = require("../models/ChallengeParticipant");

const getChallengeParticipants = async (req, res) => {
  const challengeParticipants = await ChallengeParticipant.find({});
  res.json(challengeParticipants);
};

const createChallengeParticipant = (req, res) => {
  const challengeParticipants = new ChallengeParticipant({
    participant_id: req.body.participant_id,
    user_id: req.body.user_id,
    challenge_id: req.body.challenge_id,
    joined_at: req.body.joined_at,
  });

  challengeParticipant.save((err, challengeParticipant) => {
    if (err) {
      res.send(err);
    }
    res.json(challengeParticipant);
  });
};

const updateChallengeParticipant = (req, res) => {
  ChallengeParticipant.findOneAndUpdate(
    { _id: req.params.challengeParticipantID },
    {
      $set: {
        participant_id: req.body.participant_id,
        user_id: req.body.user_id,
        challenge_id: req.body.challenge_id,
        joined_at: req.body.joined_at,
      },
    },
    { new: true },
    (err, UseChallengeParticipant) => {
      if (err) {
        res.send(err);
      } else res.json(ChallengeParticipant);
    }
  );
};

const deleteChallengeParticipant = (req, res) => {
  ChallengeParticipant.deleteOne({ _id: req.params.challengeParticipantID })
    .then(() => res.json({ message: "ChallengeParticipant Deleted" }))
    .catch((err) => res.send(err));
};

module.exports = {
  getChallengeParticipants,
  createChallengeParticipant,
  updateChallengeParticipant,
  deleteChallengeParticipant,
};
