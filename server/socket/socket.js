import dotenv from "dotenv"; // for environment variable
dotenv.config();

import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      process.env.CLIENT_URL,
      "https://chat-app-mern-full-stack-project-2-1smpr3qba.vercel.app",
    ],
  },
});

const userSocketMap = {
  //userId : socketId
};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId; // frontend se bbheja gaya query handshake me aataa hai
  if (!userId) return;

  userSocketMap[userId] = socket.id;
  io.emit("onlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("onlineUsers", Object.keys(userSocketMap));
  });
});

const getSocketId = (userId) => {
  return userSocketMap[userId];
};

export { io, app, server, getSocketId };
