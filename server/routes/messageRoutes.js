import express from "express";
import auth from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

import {
  sendMessage,
  getChat,
  getAnnouncements, // 👈 ADD
  updateMessage,
  deleteMessage,
  markAsRead,
} from "../controllers/messageController.js";

const router = express.Router();

// send (chat + announcement)
router.post("/", auth, sendMessage);

// chat
router.get("/chat/:userId", auth, getChat);

// announcements
router.get("/announcements", auth, getAnnouncements);

// CRUD
router.put("/:id", auth, admin, updateMessage);
router.delete("/:id", auth, admin, deleteMessage);
router.put("/read/:id", auth, markAsRead);

export default router;