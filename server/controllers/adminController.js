import User from "../models/User.js";
import StudyLog from "../models/StudyLog.js";
import Message from "../models/Message.js";

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