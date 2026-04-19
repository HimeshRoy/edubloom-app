import Lecture from "../models/Lecture.js";

export const getLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find().sort({ createdAt: -1 });
    res.json(lectures);
  } catch (err) {
    res.status(500).json({ message: "Error fetching lectures" });
  }
};

export const createLecture = async (req, res) => {
  try {
    const { title, subject, videoUrl } = req.body;

    const lecture = await Lecture.create({
      title,
      subject,
      videoUrl,
    });

    res.json(lecture);
  } catch (err) {
    res.status(500).json({ message: "Lecture creation failed" });
  }
};

export const getAllLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find().sort({ createdAt: -1 });
    res.json(lectures);
  } catch (err) {
    res.status(500).json({ message: "Error fetching lectures" });
  }
};

export const updateLecture = async (req, res) => {
  try {
    const updated = await Lecture.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

export const deleteLecture = async (req, res) => {
  try {
    await Lecture.findByIdAndDelete(req.params.id);
    res.json({ message: "Lecture deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};