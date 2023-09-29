const express = require("express");
const verify = require("../middleware/verify");
const userRouter = express.Router();
const {
  getUser,
  getUserList,
  signUp,
  login,
  verifyUser,
} = require("../controllers/userController");

userRouter.get("/users", verify, getUser);

userRouter.get("/list", verify, getUserList);

userRouter.post("/signup", signUp);

userRouter.post("/login", login);

userRouter.post("/verify", verifyUser);

module.exports = userRouter;
