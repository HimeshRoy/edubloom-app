import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateStudent } from "../utils/generateId.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, className, phone, state } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

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

  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: "No user" });

  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({
    token,
    role: user.role, // 🔥 important
    user,
  });
};