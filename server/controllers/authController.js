import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateStudent } from "../utils/generateId.js";
import Otp from "../models/Otp.js";
import { sendEmail } from "../utils/sendEmail.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, className, phone, state, otp  } = req.body;

     // 🔥 verify OTP
    const record = await Otp.findOne({ email });

    if (!record) {
      return res.status(400).json({ message: "No OTP found" });
    }

    if (record.expiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    if (record.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // 🔥 delete OTP after success
    await Otp.deleteOne({ email });

    // 🔥 VALIDATIONS FIRST
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({ message: "Phone already registered" });
    }

    // 🔥 HASH AFTER VALIDATION
    const hashed = await bcrypt.hash(password, 10);

    // 🔥 GENERATE STUDENT ID
    const { studentId, studentEmail } = await generateStudent(className);

    const user = await User.create({
      name,
      email,
      phone,
      state,
      password: hashed,
      class: className,
      studentId,
      studentEmail,
      role: "student",
    });

    res.json({
      message: "Signup success",
      studentId,
      studentEmail,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

 const user = await User.findOne({ email }).select("+password");

  if (!user) return res.status(400).json({ message: "No user" });

  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role, // 🔥 CRITICAL
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    token,
    role: user.role,
    user,
  });
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // 🔥 check user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 🔥 delete old OTP
    await Otp.deleteMany({ email });

    // 🔥 save new OTP
    await Otp.create({
      email,
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    // 🔥 send email
    await sendEmail(email, "Your OTP", `Your OTP is ${otp}`);

    res.json({ message: "OTP sent successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "OTP failed" });
  }
};