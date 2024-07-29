import { Server } from "socket.io";
import { createServer } from "http";
import app from "@/Utilities/server";

const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A user has connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});