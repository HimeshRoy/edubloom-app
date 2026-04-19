import LiveClass from "../models/LiveClass.js";

// 👨‍🎓 STUDENT VIEW
export const getLiveClasses = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const classes = await LiveClass.find({
      date: { $gte: today },
    }).sort({ date: 1 });

    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching classes" });
  }
};

// 👑 CREATE
export const createClass = async (req, res) => {
  try {
    const { subject, teacher, time, date, meetLink } = req.body;

    if (!subject || !teacher || !time || !date || !meetLink) {
      return res.status(400).json({ message: "All fields required" });
    }

    const cls = await LiveClass.create({
      subject,
      teacher,
      time,
      date,
      meetLink,
    });

    res.json(cls);
  } catch (err) {
    res.status(500).json({ message: "Create class failed" });
  }
};

// 👑 ADMIN VIEW
export const getAllClasses = async (req, res) => {
  try {
    const classes = await LiveClass.find().sort({ date: 1 });
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching classes" });
  }
};

// ✏️ UPDATE
export const updateClass = async (req, res) => {
  try {
    const updated = await LiveClass.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" }
    );

    if (!updated) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

// ❌ DELETE
export const deleteClass = async (req, res) => {
  try {
    const deleted = await LiveClass.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.json({ message: "Class deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};