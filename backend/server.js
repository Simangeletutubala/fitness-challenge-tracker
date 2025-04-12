const express = require('express');
const router = require("./router");
const mongoose = require('mongoose');
const cors = require("cors");
const dotenv = require('dotenv');
var populateLeaderboards = require("./services/leaderboard");

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,   
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json()); // Middleware for parsing JSON
app.use(express.urlencoded({ extended: false }));

app.use(router);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port  ----- ${PORT}`));

populateLeaderboards();
setInterval(populateLeaderboards, 50000);

