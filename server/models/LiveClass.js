import mongoose from "mongoose";

const liveClassSchema = new mongoose.Schema({
  subject: {
    type: String,
    enum: ["Maths", "Physics", "Chemistry", "Biology"],
    required: true,
  },

  teacher: {
    type: String,
    required: true,
  },

  time: {
    type: String,
    required: true,
  },

  endTime: {
    type: String,
    required: true,
  },

  meetLink: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("LiveClass", liveClassSchema);