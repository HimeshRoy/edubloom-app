import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    default: "",
  },

  options: {
    type: [String],
    required: true,
  },

  correct: {
    type: Number,
    required: true,
  },
});

const testSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    subject: String,

    className: String, // ✅ FIXED (no 'class')

    startTime: Date,
    endTime: Date,

    marksPerQuestion: {
      type: Number,
      default: 4,
    },

    negativeMarks: {
      type: Number,
      default: 1, // 🔥 NEW
    },

    timePerQuestion: {
      type: Number,
      default: 60,
    },

    duration: Number, // auto calc

    instructions: String,

    questions: {
      type: [questionSchema],
      default: [], // 🔥 THIS SAVES YOU
    },

    totalMarks: Number,

    totalQuestions: Number, // 🔥 NEW

    isPublished: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    allowedAttempts: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true } // 🔥 IMPORTANT
);

// 🔥 AUTO CALC BEFORE SAVE
testSchema.pre("save", function () {
  const qLen = this.questions?.length || 0;

  this.totalQuestions = qLen;
  this.totalMarks = qLen * (this.marksPerQuestion || 0);
  this.duration = (qLen * (this.timePerQuestion || 0)) / 60;
});

export default mongoose.model("Test", testSchema);