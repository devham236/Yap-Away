const UserModel = require("../models/UserModel");
const genToken = require("../utils/genToken");
const jwt = require("jsonwebtoken");

const getUser = async (req, res) => {
  const input = req.query.search;
  try {
    const users = await UserModel.getUsers(input);
    res.status(200).json({ users });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getUserList = async (req, res) => {
  const list = await UserModel.find({});
  res.status(200).json({ usersList: list });
};

const signup = async (req, res) => {
  const { username, email, password, bgColor } = req.body;
  try {
    const newUser = await UserModel.signup(username, email, password, bgColor);
    const token = genToken(newUser._id);
    res.status(200).json({
      username: newUser.username,
      email: newUser.email,
      _id: newUser._id,
      token,
      bgColor: newUser.bgColor,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.login(email, password);
    const token = genToken(user._id);
    res.status(200).json({
      username: user.username,
      email: user.email,
      _id: user._id,
      token,
      bgColor: user.bgColor,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const verifyUser = async (req, res) => {
  const { token } = req.body;
  if (token) {
    jwt.verify(token, process.env.JWT_KEY, async (err, data) => {
      if (err) throw err;
      const matchingUser = await UserModel.findOne({ _id: data.id });
      res.status(200).json({
        username: matchingUser.username,
        email: matchingUser.email,
        _id: matchingUser._id,
        bgColor: matchingUser.bgColor,
      });
    });
  } else {
    res.status(400).json({ message: "No token provided" });
  }
};

module.exports = { getUser, getUserList, login, signup, verifyUser };
