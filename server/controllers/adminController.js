import User from "../models/User.js";
import StudyLog from "../models/StudyLog.js";
import Message from "../models/Message.js";
import LiveClass from "../models/LiveClass.js";
import Lecture from "../models/Lecture.js";
import Note from "../models/Note.js";

import User from "../models/User.js";

export const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" })
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Error fetching students" });
  }
};

export const getStudentDetails = async (req, res) => {
  try {
    const student = await User.findById(req.params.id).select("-password");

    const logs = await StudyLog.find({ userId: student._id })
      .sort({ createdAt: -1 })
      .limit(10);

    const totalHours = logs.reduce((sum, log) => sum + log.duration, 0);

    res.json({
      student,
      logs,
      totalHours,
    });

  } catch (err) {
    res.status(500).json({ message: "Error fetching student details" });
  }
};

export const getAdminDashboard = async (req, res) => {
    try {
        // 🔥 COUNTS
        const totalStudents = await User.countDocuments({ role: "student" });
        const totalLectures = await Lecture.countDocuments();
        const totalNotes = await Note.countDocuments();
        const totalClasses = await LiveClass.countDocuments();

        // 🔥 RECENT STUDENTS
        const recentStudents = await User.find({ role: "student" })
            .sort({ createdAt: -1 })
            .limit(5)
            .select("name studentEmail createdAt");

        // 🔥 RECENT ACTIVITY
        const recentLogs = await StudyLog.find()
            .sort({ createdAt: -1 })
            .limit(5);

        res.json({
            stats: {
                totalStudents,
                totalLectures,
                totalNotes,
                totalClasses,
            },
            recentStudents,
            recentLogs,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Admin dashboard error" });
    }
};