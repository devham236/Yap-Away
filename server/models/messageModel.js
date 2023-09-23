const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  author: {
    type: String,
  },
  content: {
    type: String,
  },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
  },
});

const MessageModel = mongoose.model("Message", messageSchema);

module.exports = MessageModel;
