const ProgressLog = require("../models/ProgressLog");

const getProgressLogs = async (req, res) => {
  const ProgressLogs = await ProgressLog.find({});
  res.json(progressLogs);
};

const createProgressLogs = (req, res) => {
  const progressLog = new ProgressLog({
    log_id: req.body.log_id,
    user_id: req.body.user_id,
    challenge_id: req.body.challenge_id,
    activity_type: req.body.activity_type,
    value: req.body.value,
    logged_at: req.body.logged_at,

  });

  progressLog.save((err, progressLog) => {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
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
