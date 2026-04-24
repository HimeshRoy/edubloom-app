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


router.get("/admin/all", getAllTestsAdmin);
router.post("/create", createTest);
router.post("/submit", submitTest);

router.post("/:id/question", addQuestion);
router.post("/:id/upload", upload.single("file"), uploadCSV);

router.put("/:id/publish", publishTest);
router.delete("/:id", deleteTest);

router.get("/result/:id", getResult);
router.get("/:id", getTest); // ALWAYS LAST 😈
router.get("/", getTests);

export default router;