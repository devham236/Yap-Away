const express = require("express");
const verify = require("../middleware/verify");
const userRouter = express.Router();
const {
  getUser,
  getUserList,
  login,
  signup,
  verifyUser,
} = require("../controllers/userController");

userRouter.get("/users", verify, getUser);

userRouter.get("/list", verify, getUserList);

userRouter.post("/signup", signup);

userRouter.post("/login", login);

userRouter.post("/verify", verifyUser);

module.exports = userRouter;
