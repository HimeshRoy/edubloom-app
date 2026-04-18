import mongoose from "mongoose";

const liveClassSchema = new mongoose.Schema({
  subject: {
    type: String,
    enum: ["Math", "Physics", "Chemistry", "Biology"],
    required: true,
  },

  teacher: String,

  time: String,

  meetLink: String,

  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("LiveClass", liveClassSchema);