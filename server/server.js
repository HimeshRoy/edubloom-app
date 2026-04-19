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


dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/live-classes", liveClassRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/user", userRoutes);
app.use("/api/study-log", studyRoutes);
app.use("/api/lectures", lectureRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/messages", messageRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});