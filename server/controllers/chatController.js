const ChatModel = require("../models/chatModel");

const createChat = async (req, res) => {
  const { roomName, participants } = req.body;
  try {
    const newChat = await ChatModel.createChat(roomName, participants);
    res.status(200).json({ newChat });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getChats = async (req, res) => {
  const username = req.query.username;
  try {
    const chats = await ChatModel.getChats(username);
    res.status(200).json({ chats });
  } catch (error) {
    res.status(400).json({ message: "No current chats" });
  }
};

const sendMessage = async (req, res) => {
  const { messageData } = req.body;
  try {
    const chat = await ChatModel.findOne({ roomName: messageData.room });
    chat.messages.push(messageData);
    await chat.save();
    res.status(200).json({ chat });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteChat = async (req, res) => {
  const { id } = req.params;
  try {
    const chats = await ChatModel.deleteChat(id);
    res.status(200).json({ chats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createChat, getChats, sendMessage, deleteChat };
