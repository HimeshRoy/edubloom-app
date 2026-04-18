import express from "express";
import { askAI } from "../controllers/aiController.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.post("/", askAI);

export default router;