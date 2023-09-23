const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    roomName: {
      type: String,
    },
    participants: {
      type: Array,
    },
    messages: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

chatSchema.statics.createChat = async function (roomName, participants) {
  // const chatExists = await this.findOne({ roomName });
  // if (chatExists) {
  //   const newUser = participants[0];
  //   chatExists.participants.push(newUser);
  //   await chatExists.save();
  //   return chatExists;
  // } else {
  //   const newChat = await this.create({ roomName, participants });
  //   return newChat;
  // }
  const chatExists = await this.findOne({ roomName });
  if (chatExists) {
    throw Error("Chat already exists.");
  } else {
    const newChat = await this.create({ roomName, participants });
    return newChat;
  }
};

chatSchema.statics.getChats = async function (username) {
  const chats = await this.find({
    participants: { $elemMatch: { username: username } },
  });

  return chats;
};

chatSchema.statics.deleteChat = async function (id) {
  const chat = await this.findOne({ _id: id });
  if (!chat) {
    throw Error("No chat found with given id.");
  }
  await this.deleteOne({ _id: id });
  return this.find({});
};

const ChatModel = mongoose.model("Chat", chatSchema);

module.exports = ChatModel;
