import express from "express";
import auth from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";
import { getAdminDashboard } from "../controllers/adminController.js";
import { deleteStudent } from "../controllers/adminController.js";
import { updateStudent } from "../controllers/adminController.js";

import {
  getAllStudents,
  getStudentDetails,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/students", auth, admin, getAllStudents);
router.get("/students/:id", auth, admin, getStudentDetails);
router.get("/dashboard", auth, admin, getAdminDashboard);
router.delete("/students/:id", auth, admin, deleteStudent);
router.put("/students/:id", auth, admin, updateStudent);

export default router;