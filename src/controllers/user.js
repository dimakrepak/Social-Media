const userModel = require("../models/user");

const createUser = async (req, res) => {
  const user = new userModel(req.body);
  try {
    const token = await user.generateAuthToken();
    await user.save();
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send(`${err}`);
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    res.status(400).send(`${err}`);
  }
};
const logoutUser = async (req, res) => {
  const user = req.user;
  try {
    user.tokens = user.tokens.filter((token) => token.token !== req.token);
    await req.user.save();
    res.send("You have been logged out");
  } catch (err) {
    res.status(500).send(err);
  }
};
const updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "email",
    "password",
    "city",
    "from",
    "languages",
    "hobbies",
    "profilePicture",
    "desc",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid updates" });
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.status(200).send(req["user"]);
  } catch (err) {
    res.status(400).send(err);
  }
};
const deleteUser = async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (err) {
    res.status(500).send();
  }
};
const getUserMe = async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(500).send();
  }
};
const followUser = async (req, res) => {
  const currentUser = req.user;
  if (currentUser._id.toString() !== req.params.id) {
    try {
      const user = await userModel.findById(req.params.id);
      if (user.followers.includes(currentUser._id)) {
        res.status(403).send("Already follow this user");
      } else {
        user.followers.push(currentUser._id);
        currentUser.following.push(user._id);
        await user.save();
        await currentUser.save();
        res.status(200).send("User has been followed");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(403).send("You cant follow yourself");
  }
};
const unfollowUser = async (req, res) => {
  const currentUser = req.user;
  if (currentUser._id.toString() !== req.params.id) {
    try {
      const user = await userModel.findById(req.params.id);
      if (!user.followers.includes(currentUser._id)) {
        res.status(403).send("Already unfollowed this user");
      } else {
        user.followers = user.followers.filter(
          (id) => id != currentUser._id.toString()
        );
        currentUser.following = currentUser.following.filter(
          (id) => id != user._id.toString()
        );
        await user.save();
        await currentUser.save();
        res.status(200).send("User unfollowed");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).send("You cant unfollow yourself");
  }
};
const getUser = async (req, res) => {
  const id = req.query.id;
  const username = req.query.username;
  try {
    const user = id
      ? await userModel.findById(id)
      : await userModel.findOne({ username });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getFollowings = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    const friends = await Promise.all(
      user.following.map((followingsId) => userModel.findById(followingsId))
    );
    res.status(200).json(friends);
  } catch (err) {
    res.status(500).json(err);
  }
};
const findUser = async (req, res) => {
  try {
    const users = await userModel.find({
      username: { $regex: req.params.username, $options: "i" },
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};
const updateUserProfile = async (req, res) => {
  try {
    req.user.profilePicture = req.body.image;
    await req.user.save();
    res.send(req.user);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getUser,
  findUser,
  createUser,
  loginUser,
  logoutUser,
  updateUser,
  deleteUser,
  getUserMe,
  followUser,
  unfollowUser,
  updateUserProfile,
  getFollowings,
};
