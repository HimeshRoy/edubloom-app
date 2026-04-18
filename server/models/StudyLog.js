import mongoose from "mongoose";

const studyLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  subject: String,

  duration: Number, // in hours

  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("StudyLog", studyLogSchema);