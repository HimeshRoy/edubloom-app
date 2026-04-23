import express from "express";
import {
  createTest,
  addQuestion,
  getTests,
  getTest,
  publishTest,
  deleteTest,
  getAllTestsAdmin,
} from "../controllers/testController.js";
import multer from "multer";
import { uploadCSV } from "../utils/csvUpload.js";
import { submitTest, getResult } from "../controllers/testController.js";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/create", createTest);
router.post("/:id/question", addQuestion);
router.post("/:id/upload", upload.single("file"), uploadCSV);
router.get("/", getTests);
router.get("/:id", getTest);
router.get("/admin/all", getAllTestsAdmin);
router.put("/:id/publish", publishTest);
router.delete("/:id", deleteTest);
router.post("/submit", submitTest);
router.get("/result/:id", getResult);

export default router;