import { app, server } from "./socket/socket.js";
import cors from "cors";
import express from "express";

import { connectDB } from "./db/connection1.db.js";
connectDB();

import cookieParser from "cookie-parser"; // cookies se aa rahe data ko parse karne e liye
app.use(cookieParser());

app.use(
  // cross server use karne ke liye (ex: frontend, backend)
  cors({
    origin: [process.env.CLIENT_URL, "https://chat-app-full-stack-project-2.vercel.app"],
    credentials: true,
  }),
);

app.use(express.json()); // body se data ko parse karne ke liye
app.use(express.urlencoded({ extended: true })); // form se data ko parse karne ke liye

const PORT = process.env.PORT || 5000;

//message routes
import messageRoute from "./routes/message.route.js";
app.use("/api/v1/message", messageRoute);

//user routes
import userRoute from "./routes/user.route.js";
app.use("/api/v1/user", userRoute);

//middleware
import { errorMiddleware } from "./middlewares/error.middleware.js";
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Hello chatapp");
});

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
