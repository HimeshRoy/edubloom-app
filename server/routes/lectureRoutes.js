import express from "express";
import { getLectures } from "../controllers/lectureController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getLectures);

export default router;