import express from "express";
import {
  createTest,
  addQuestion,
  getTests,
  getTest,
  publishTest,
  deleteTest,
  getAllTestsAdmin,
  submitTest,
  getResult,
} from "../controllers/testController.js";

import multer from "multer";
import { uploadCSV } from "../utils/csvUpload.js";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

// 🔥 1. STATIC ROUTES (NO PARAMS)
router.get("/admin/all", getAllTestsAdmin);
router.post("/create-test", createTest);
router.post("/submit", submitTest);

// 🔥 2. PARAM ROUTES (SPECIFIC)
router.post("/:id/question", addQuestion);
router.post("/:id/upload", upload.single("file"), uploadCSV);
router.put("/:id/publish", publishTest);
router.delete("/:id", deleteTest);
router.get("/result/:id", getResult);

// 🔥 3. LIST ROUTE
router.get("/", getTests);

// ❌ 4. ALWAYS LAST (MOST IMPORTANT)
router.get("/:id", getTest);

export default router;