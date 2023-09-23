const express = require("express");
const verify = require("../middleware/verify");
const chatRouter = express.Router();
const {
  createChat,
  getChats,
  sendMessage,
  deleteChat,
} = require("../controllers/chatController");

chatRouter.post("/create", createChat);

chatRouter.get("/chats", getChats);

chatRouter.post("/sendMessage", sendMessage);

chatRouter.delete("/:id", deleteChat);

module.exports = chatRouter;
