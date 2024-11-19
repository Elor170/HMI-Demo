import { Server, Socket } from "socket.io";
import { httpServer } from "@/Utilities/server";
import { updateMsg } from "./dataBase";

let socket: Socket | null = null;

const initSocket = () => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (_socket: Socket) => {
    socket = _socket;
    console.log("A user has connected: " + socket.id);

    socket.on("disconnect", () => {
      socket = null;
      console.log("User disconnected: " + _socket.id);
    });

    socket.on("waterfallToBackend", (data: WaterfallObject) => {
      data.sendingTime = new Date(data.sendingTime);
      data.backendTime = new Date(data.backendTime ?? "");
      data.frontendTime = new Date(data.frontendTime ?? "");
      updateMsg(data);
    });
  });
};

const sendWaterfallData = (data: WaterfallObject) => {
  if (socket) {
    socket.emit("waterfallToFrontend", data);
  }
};

export { sendWaterfallData };
export default initSocket;
