import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import liveClassRoutes from "./routes/liveClassRoutes.js";


dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/live-classes", liveClassRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});