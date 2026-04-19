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
import User from "./models/User.js";
import bcrypt from "bcryptjs";
import adminRoutes from "./routes/adminRoutes.js";


dotenv.config();
connectDB();

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
      studentEmail: "admin@edubloom",
      class: "admin",
    });

    console.log("✅ Admin created");
  }
};

createAdmin();


const PORT = process.env.PORT || 5000;

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/live-classes", liveClassRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/user", userRoutes);
app.use("/api/study-log", studyRoutes);
app.use("/api/lectures", lectureRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});