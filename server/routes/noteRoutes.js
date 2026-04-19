import express from "express";
import auth from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";

const router = express.Router();

// 👨‍🎓 student + admin (read)
router.get("/", auth, getNotes);

// 👑 admin only (write)
router.post("/", auth, admin, createNote);
router.put("/:id", auth, admin, updateNote);
router.delete("/:id", auth, admin, deleteNote);

export default router;