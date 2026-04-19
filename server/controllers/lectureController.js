import Lecture from "../models/Lecture.js";

export const getLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find().sort({ createdAt: -1 });

    if (req.user.role === "admin") {
      return res.json(lectures); // full data
    }

    // student view
    const filtered = lectures.map((lec) => ({
      title: lec.title,
      subject: lec.subject,
      videoUrl: lec.videoUrl,
    }));

    res.json(filtered);
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

export const updateLecture = async (req, res) => {
  try {
    const updated = await Lecture.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" }
    );

    if (!updated) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

export const deleteLecture = async (req, res) => {
  try {
    const deleted = await Lecture.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    res.json({ message: "Lecture deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};