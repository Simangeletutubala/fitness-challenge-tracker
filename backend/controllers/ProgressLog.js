const ProgressLog = require("../models/ProgressLog");

const getProgressLogs = async (req, res) => {
  const progressLogs = await ProgressLog.find({challenge_id : req.query.challenge_id, user_id: req.query.user_id});
  res.json(progressLogs);
};

const createProgressLogs = async (req, res) => {
  const progressLog = new ProgressLog({   
    user_id: req.body.userId,
    challenge_id: req.body._id,
    activity_type: req.body.activity_type,
    value: req.body.value
  });

  try {
    await progressLog.save();
    res.status(201).json(progressLog);
  } catch (err) {
    res.status(400).json({ error: "Failed to create challenge" });
  }  
};

const updateProgressLog = (req, res) => {
  ProgressLog.findOneAndUpdate(
    { _id: req.params.progressLogID },
    {
      $set: {
        log_id: req.body.log_id,
        user_id: req.body.user_id,
        challenge_id: req.body.challenge_id,
        activity_type: req.body.activity_type,
        value: req.body.value,
        logged_at: req.body.logged_at,
      },
    },
    { new: true },
    (err, ProgressLog) => {
      if (err) {
        res.send(err);
      } else res.json(ProgressLog);
    }
  );
};

const deleteProgressLog = (req, res) => {
  ProgressLog.deleteOne({ _id: req.params.progressLogID })
    .then(() => res.json({ message: "ProgressLog Deleted" }))
    .catch((err) => res.send(err));
};

module.exports = {
  getProgressLogs,
  createProgressLogs,
  updateProgressLog,
  deleteProgressLog,
};
