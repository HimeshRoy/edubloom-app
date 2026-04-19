import express from "express";
import auth from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

import {
  sendMessage,
  getMessages,
  updateMessage,
  deleteMessage,
  markAsRead,
} from "../controllers/messageController.js";

const router = express.Router();

router.post("/", auth, admin, sendMessage);
router.get("/", auth, getMessages);

router.put("/:id", auth, admin, updateMessage);
router.delete("/:id", auth, admin, deleteMessage);

router.put("/read/:id", auth, markAsRead);

export default router;