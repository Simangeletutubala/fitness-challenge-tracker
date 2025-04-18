const express = require('express');
const router = require("./router");
const mongoose = require('mongoose');
const cors = require("cors");
const dotenv = require('dotenv');
const multer = require('multer');
var populateLeaderboards = require("./services/leaderboard");

dotenv.config();

const app = express();
 mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json()); // Middleware for parsing JSON
app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    return cb( null, './public/Images/')
  },
  filename: function(req, file, cb){
    const fileNameSplit = file.originalname.split('.');
    const index = fileNameSplit?.length - 1;
    return cb(null, `${req.params.filename}.${fileNameSplit[index]}`);
  }
});

const upload = multer({storage});

app.post('/upload/:filename', (req, res) => {
  upload.single('file');  
  console.log(req.params.filename);
  res.send('upload successful');
});

app.use(
  '/photoUrl',
   express.static(path.join(__dirname, './public/Images/'))
 );

app.use(router);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port  ----- ${PORT}`));

populateLeaderboards();
setInterval(populateLeaderboards, 50000);

