import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    password: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
        default: "",
    },

    state: {
        type: String,
        default: "",
    },

    studentId: {
        type: String,
        required: true,
        unique: true,
    },

    studentEmail: {
        type: String,
        required: true,
        unique: true,
    },

    class: {
        type: String,
        default: "10",
        enum: ["10"],
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
    totalHours: {
        type: Number,
        default: 0,
    },

    streak: {
        type: Number,
        default: 0,
    },

    lastActiveDate: {
        type: Date,
    },
    role: {
        type: String,
        enum: ["student", "admin"],
        default: "student",
    },
});

export default mongoose.model("User", userSchema);