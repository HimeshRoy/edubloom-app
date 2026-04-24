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

// 🔥 STATIC ROUTES FIRST
router.get("/admin/all", getAllTestsAdmin);
router.post("/create", createTest);
router.post("/submit", submitTest);

// 🔥 OTHER SPECIFIC ROUTES
router.post("/:id/question", addQuestion);
router.post("/:id/upload", upload.single("file"), uploadCSV);
router.put("/:id/publish", publishTest);
router.delete("/:id", deleteTest);

router.get("/result/:id", getResult);

// ✅ THIS MUST COME BEFORE :id
router.get("/", getTests);

// ❌ ALWAYS LAST
router.get("/:id", getTest);

console.log("🔥 NEW ROUTES FILE LOADED");
export default router;