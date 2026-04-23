import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  testId: {
    type: String,
    required: true,
  },

  answers: [Number],

  score: Number,
  correct: Number,
  wrong: Number,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Result", resultSchema);