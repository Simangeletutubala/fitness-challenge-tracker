const {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
  } = require("./controllers/User");

  const {
    getChallenges,
    createChallenge,
    updateChallenge,
    deleteChallenge,
  } = require("./controllers/Challenge");

  const {
    getChallengeParticipants,
    createChallengeParticipant,
    updateChallengeParticipant,
    deleteChallengeParticipant,
  } = require("./controllers/ChallengeParticipants");

  const {
    getProgressLogs,
    createProgressLogs,
    updateProgressLog,
    deleteProgressLog,
  } = require("./controllers/ProgressLogs");

  const {
    getLeaderboards,
    createLeaderboard,
    updateLeaderboard,
    deleteLeaderboard,
  } = require("./controllers/Leaderboard");
  
  const {
    register,
    login
  } = require("./controllers/authorisation");

  const router = require("express").Router();
  
  router.get("/", (req, res) => {
    res.send("Let's build a CRUD API!");
  });
  
  router.get("/api/users", getUsers);
  router.post("/api/users", createUser);
  router.put("/api/users/:userId", updateUser);
  router.delete("/api/users/:userId", deleteUser);  
  
  router.get("/api/challenges", getChallenges);
  router.post("/api/challenges", createChallenge);
  router.put("/api/challenges/:challengeId", updateChallenge);
  router.delete("/api/challenges/:challengeId", deleteChallenge);  

  router.get("/api/challengeParticipants", getChallengeParticipants);
  router.post("/api/challengeParticipants", createChallengeParticipant);
  router.put("/api/challengeParticipants/:challengeParticipantId", updateChallengeParticipant);
  router.delete("/api/challengeParticipants/:challengeParticipantId", deleteChallengeParticipant);  

  router.get("/api/progressLogs", getProgressLogs);
  router.post("/api/progressLogs", createProgressLogs);
  router.put("/api/progressLogs/:progressLogId", updateProgressLog);
  router.delete("/api/progressLogs/:progressLogId", deleteProgressLog);  

  router.get("/api/leaderboard", getLeaderboards);
  router.post("/api/leaderboard", createLeaderboard);
  router.put("/api/leaderboard/:leaderboardId", updateLeaderboard);
  router.delete("/api/leaderboard/:leaderboardId", deleteLeaderboard);  

  router.post("/api/register", register);
  router.post("/api/login", login);

  module.exports = router;
  