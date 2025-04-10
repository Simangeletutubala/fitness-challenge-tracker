const User = require("../models/User");

const getUsers = async (req, res) => {
  const users = await User.find({});
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

const updateUser = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userID },
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        profile_picture: req.body.profile_picture,
      },
    },
    { new: true },
    (err, User) => {
      if (err) {
        res.send(err);
      } else res.json(User);
    }
  );
};

const deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.userID })
    .then(() => res.json({ message: "User Deleted" }))
    .catch((err) => res.send(err));
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
