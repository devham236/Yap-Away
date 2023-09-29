const express = require("express");
const verify = require("../middleware/verify");
const chatRouter = express.Router();
const {
  createChat,
  getChats,
  sendMessage,
  deleteChat,
} = require("../controllers/chatController");

chatRouter.post("/create", verify, createChat);

chatRouter.get("/chats", verify, getChats);

chatRouter.post("/sendMessage", verify, sendMessage);

chatRouter.delete("/:id", verify, deleteChat);

module.exports = chatRouter;
