import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  subject: {
    type: String,
    enum: ["Maths", "Physics", "Chemistry", "Biology"],
    required: true,
  },

  title: String,

  pdfUrl: String, // 🔥 PDF link

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Note", noteSchema);