import Lecture from "../models/Lecture.js";

export const getLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find().sort({ createdAt: -1 });
    res.json(lectures);
  } catch (err) {
    res.status(500).json({ message: "Error fetching lectures" });
  }
};