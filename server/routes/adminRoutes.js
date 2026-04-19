import express from "express";
import auth from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

import {
  getAllStudents,
  getStudentDetails,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/students", auth, admin, getAllStudents);
router.get("/students/:id", auth, admin, getStudentDetails);

export default router;