import express from "express";
import { logStudy } from "../controllers/studyController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, logStudy);

export default router;