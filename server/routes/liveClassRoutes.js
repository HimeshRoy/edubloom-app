import express from "express";
import auth from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

import {
  createClass,
  getAllClasses,
  updateClass,
  deleteClass,
} from "../controllers/liveClassController.js";

const router = express.Router();

// 👨‍🎓 student
router.get("/", auth, async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const classes = await LiveClass.find({
    date: { $gte: today },
  }).sort({ date: 1 });

  res.json(classes);
});

// 👑 admin
router.post("/", auth, admin, createClass);
router.get("/admin", auth, admin, getAllClasses);
router.put("/:id", auth, admin, updateClass);
router.delete("/:id", auth, admin, deleteClass);

export default router;