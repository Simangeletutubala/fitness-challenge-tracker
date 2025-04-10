const express = require('express');
const router = require("./router");
const mongoose = require('mongoose');
const cors = require("cors");
const dotenv = require('dotenv');
const userRoutes = require('./api/userRoutes'); // ✅ Import the router correctly

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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
// Use routes correctly
app.use('/api/users', userRoutes); // ✅ Ensure userRoutes is correctly imported
app.use(router);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port  ----- ${PORT}`));

