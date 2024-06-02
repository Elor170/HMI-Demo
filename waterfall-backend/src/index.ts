import express from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { createServer } from "http";
dotenv.config();
const { PORT } = process.env;

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A user has connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.get("/", (_, res) => {
  return res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
