import Note from "../models/Note.js";

// 🔥 CREATE
export const createNote = async (req, res) => {
  try {
    const { title, subject, pdfUrl } = req.body;

    const note = await Note.create({
      title,
      subject,
      pdfUrl,
    });

    res.json(note);
  } catch (err) {
    res.status(500).json({ message: "Note creation failed" });
  }
};

// 🔥 READ
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching notes" });
  }
};

// 🔥 UPDATE
export const updateNote = async (req, res) => {
  try {
    const updated = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" }
    );

    if (!updated) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

// 🔥 DELETE
export const deleteNote = async (req, res) => {
  try {
    const deleted = await Note.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};