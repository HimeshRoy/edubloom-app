import express from "express";
import { getLectures } from "../controllers/lectureController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { createLecture, updateLecture, deleteLecture } from "../controllers/lectureController.js";
import admin from "../middleware/adminMiddleware.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getLectures);
router.post("/", auth, admin, createLecture);
router.put("/:id", auth, admin, updateLecture);
router.delete("/:id", auth, admin, deleteLecture);

export default router;



