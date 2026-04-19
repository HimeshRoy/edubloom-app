import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
  subject: {
    type: String,
    enum: ["Maths", "Physics", "Chemistry", "Biology"],
    required: true,
  },

  title: String,

  videoUrl: String,

  duration: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Lecture", lectureSchema);