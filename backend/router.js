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
  } = require("./controllers/ProgressLog");

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

  const authMiddleware = require("./middleware/authMiddleware");

  const router = require("express").Router();
  
  router.get("/", (req, res) => {
    res.send("Let's build a CRUD API!");
  });
  
  router.get("/api/users", getUsers);
  router.post("/api/users", createUser);
  router.put("/api/users/:userId", updateUser);
  router.delete("/api/users/:userId", deleteUser);  
  
  router.get("/api/challenges",authMiddleware, getChallenges);
  router.post("/api/challenges",authMiddleware, createChallenge);
  router.put("/api/challenges/:challengeId",authMiddleware, updateChallenge);
  router.delete("/api/challenges/:challengeId",authMiddleware, deleteChallenge);  

  router.get("/api/challengeParticipants",authMiddleware, getChallengeParticipants);
  router.post("/api/challengeParticipants",authMiddleware, createChallengeParticipant);
  router.put("/api/challengeParticipants/:challengeParticipantId",authMiddleware, updateChallengeParticipant);
  router.delete("/api/challengeParticipants/:challengeParticipantId",authMiddleware, deleteChallengeParticipant);  

  router.get("/api/progressLogs",authMiddleware, getProgressLogs);
  router.post("/api/progressLogs",authMiddleware, createProgressLogs);
  router.put("/api/progressLogs/:progressLogId",authMiddleware, updateProgressLog);
  router.delete("/api/progressLogs/:progressLogId",authMiddleware, deleteProgressLog);  

  router.get("/api/leaderboard",authMiddleware, getLeaderboards);
  router.post("/api/leaderboard",authMiddleware, createLeaderboard);
  router.put("/api/leaderboard/:leaderboardId",authMiddleware, updateLeaderboard);
  router.delete("/api/leaderboard/:leaderboardId",authMiddleware, deleteLeaderboard);  

  router.post("/api/register", register);
  router.post("/api/login", login);

  module.exports = router;
  