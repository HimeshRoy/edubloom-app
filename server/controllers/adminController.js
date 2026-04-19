import User from "../models/User.js";
import StudyLog from "../models/StudyLog.js";
import Message from "../models/Message.js";
import LiveClass from "../models/LiveClass.js";
import Lecture from "../models/Lecture.js";
import Note from "../models/Note.js";

export const getAllStudents = async (req, res) => {
    try {
        const students = await User.find({ role: "student" }).select("-password");
        res.json(students);
    } catch {
        res.status(500).json({ message: "Error" });
    }
};

export const getStudentDetails = async (req, res) => {
    try {
        const student = await User.findById(req.params.id).select("-password");

        const logs = await StudyLog.find({ userId: student._id });
        const messages = await Message.find({ userId: student._id });

        res.json({
            student,
            logs,
            messages,
        });
    } catch {
        res.status(500).json({ message: "Error" });
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