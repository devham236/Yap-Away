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

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../../chat-app/client/src/images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });

userRouter.get("/users", verify, getUser);

userRouter.get("/list", verify, getUserList);

userRouter.post("/signup", upload.single("image"), signup);

userRouter.post("/login", login);

userRouter.post("/verify", verifyUser);

module.exports = userRouter;
