import express from "express";
import { getLiveClasses } from "../controllers/liveClassController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getLiveClasses);

export default router;