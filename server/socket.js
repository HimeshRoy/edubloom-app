import { Server } from "socket.io";
import { initSocket } from "./socket.js";

initSocket(server);
export const initSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("Connected");

    // 🎥 video stream
    socket.on("video_frame", (data) => {
      io.emit("admin_video", data);
    });

    // ⚠️ cheating alerts
    socket.on("cheating_event", (data) => {
      io.emit("admin_alert", data);
    });
  });
  const server = app.listen(5000, () =>
  console.log("Server running")
);

};