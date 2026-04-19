import express from "express";
import auth from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

import {
  createClass,
  getAllClasses,
  updateClass,
  deleteClass,
  getLiveClasses,
} from "../controllers/liveClassController.js";

const router = express.Router();

router.get("/", auth, getLiveClasses);

// 👑 admin
router.post("/", auth, admin, createClass);
router.get("/admin", auth, admin, getAllClasses);
router.put("/:id", auth, admin, updateClass);
router.delete("/:id", auth, admin, deleteClass);

export default router;