import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import liveClassRoutes from "./routes/liveClassRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import studyRoutes from "./routes/studyRoutes.js";
import lectureRoutes from "./routes/lectureRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import cors from "cors";

import User from "./models/User.js";
import bcrypt from "bcryptjs";

import { Server } from "socket.io";
import http from "http";

dotenv.config();
connectDB();
app.use(cors());
const PORT = process.env.PORT || 5000;

// 🔥 CREATE SERVER (IMPORTANT)
const server = http.createServer(app);

// 🔥 SOCKET
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use((req, res, next) => {
  console.log("👉", req.method, req.originalUrl);
  next();
});

// 🔥 MAKE IO GLOBAL
app.set("io", io);

// 🔥 CONNECTION
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // 👇 ADD THIS
  socket.on("typing", (userId) => {
    socket.broadcast.emit("user_typing", userId);
  });

  socket.on("stop_typing", () => {
    socket.broadcast.emit("stop_typing");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// 🔥 ADMIN AUTO CREATE
const createAdmin = async () => {
  const existing = await User.findOne({
    email: "admin.edubloom@eduaction",
  });

  if (!existing) {
    const hashed = await bcrypt.hash(
      "edubloom2026@education",
      10
    );

    await User.create({
      name: "Admin",
      email: "admin.edubloom@eduaction",
      password: hashed,
      role: "admin",
      studentId: "ADMIN001",
      studentEmail: "admin@edu",
    });

    console.log("Admin created");
  }
};

createAdmin();

let onlineUsers = {};

io.on("connection", (socket) => {
  socket.on("join", (userId) => {
    onlineUsers[userId] = socket.id;
    io.emit("online_users", Object.keys(onlineUsers));
  });

  socket.on("disconnect", () => {
    for (let user in onlineUsers) {
      if (onlineUsers[user] === socket.id) {
        delete onlineUsers[user];
      }
    }
    io.emit("online_users", Object.keys(onlineUsers));
  });
});

// 🔥 ROUTES
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/live-classes", liveClassRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/user", userRoutes);
app.use("/api/study-log", studyRoutes);
app.use("/api/lectures", lectureRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/tests", testRoutes);

// 🔥 FINAL START (ONLY THIS)
server.listen(PORT, () => {
  console.log(`🚀 Server + Socket running on port ${PORT}`);
});