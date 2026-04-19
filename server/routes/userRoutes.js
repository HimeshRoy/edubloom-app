import express from "express";
import { getProfile, updateProfile } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/me", authMiddleware, getProfile);
router.put("/update", authMiddleware, updateProfile);

router.get("/admin", authMiddleware, async (req, res) => {
  const admin = await User.findOne({ role: "admin" }).select("-password");
  res.json(admin);
});

export default router;