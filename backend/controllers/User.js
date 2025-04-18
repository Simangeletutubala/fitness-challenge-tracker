const User = require("../models/User");

const getUser = async (req, res) => {
  const users = (await User.find({_id : req.user.userId }))[0];
  res.json(users);
};

const createUser = (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    profile_picture: req.body.profile_picture,
  });

  user.save((err, user) => {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
};

const updateUser = async (req, res) => {
  //password: req.body.password,
  try {
    console.log(req.body.imgString);
    await  User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,        
          profile_picture: req.body.imgString,
        },
      },
      { new: true }
    );
  } catch (error) {
    console.log(error);
  }

};

const deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.userID })
    .then(() => res.json({ message: "User Deleted" }))
    .catch((err) => res.send(err));
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
