const express = require("express");
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

const app = express();
app.use(cors({ origin: "https://chat-app-frontend-indol.vercel.app/" }));
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

const chatRouter = require("./routes/chatRoutes");
const userRouter = require("./routes/userRoutes");
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/user", userRouter);

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("joinRoom", (data) => {
    socket.join(data);
    console.log(`User ${socket.id} joined room: ${data}`);
  });

  socket.on("sendMessage", (data) => {
    socket.to(data.room).emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log("Server is running and connected to database");
    });
  })
  .catch((err) => {
    console.log(err);
  });
