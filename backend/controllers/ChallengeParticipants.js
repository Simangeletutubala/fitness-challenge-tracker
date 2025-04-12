const ChallengeParticipant = require("../models/ChallengeParticipant");
const User = require("../models/User");
const Challenge = require("../models/Challenge");
const ProgressLog = require("../models/ProgressLog");

const getChallengeParticipants = async (req, res) => {
  let returnValue = [];
  const challenge = (await Challenge.find({_id : req.query.challenge_id}))[0];
  
  if(challenge){
    const participants = (await ChallengeParticipant.find({challenge_id: challenge._id}));
    for (let index = 0; index < participants.length; index++) {
      const participant = participants[index];
      const user = (await User.find({_id : participant.user_id}))[0];
      let points = 0;
     
      const progressLogs = (await ProgressLog.find({user_id : participant.user_id, challenge_id : challenge._id})).forEach( log => {
        points = points + log.value;
      });

      if(user){             
        returnValue.push({
          user_id: user._id,
          name: user.name,
          points: points
        });
      } 
    }
  }
  
  res.json(returnValue);
};

const createChallengeParticipant = async (req, res) => {
  const challengeParticipant = new ChallengeParticipant({   
    user_id: req.user.userId,
    challenge_id: req.body._id,
    joined_at: new Date(),
  });

  try {
    await challengeParticipant.save();
    res.status(201).json(challengeParticipant);
  } catch (err) {
    res.status(400).json({ error: "Failed to create challenge" });
  }  
  
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
  ChallengeParticipant.deleteOne({ _id: req.params._id })
    .then(() => res.json({ message: "ChallengeParticipant Deleted" }))
    .catch((err) => res.send(err));
};

module.exports = {
  getChallengeParticipants,
  createChallengeParticipant,
  updateChallengeParticipant,
  deleteChallengeParticipant,
};
