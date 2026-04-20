import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateStudent } from "../utils/generateId.js";
import Otp from "../models/Otp.js";
import { sendEmail } from "../utils/sendEmail.js";
import { getWelcomeTemplate } from "../utils/emailTemplates.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, className, phone, state, otp } = req.body;

    // 🔥 verify OTP
    const record = await Otp.findOne({ email });

    if (!record) {
      return res.status(400).json({ message: "No OTP found" });
    }

    if (record.expiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    if (record.otp !== otp.trim()) {
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

    // 🔥 create user
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

// 🔥 send welcome email
await sendEmail(
  email,
  "🎉 Welcome to EduBloom",
  getWelcomeTemplate({
    name,
    studentId,
    studentEmail,
  })
);

// 🔥 generate token
const token = jwt.sign(
  {
    id: user._id,
    role: user.role,
  },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

// 🔥 FINAL RESPONSE (ONLY ONE 😏)
res.json({
  message: "Signup success",
  token,
  role: user.role,
  user,
});

  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    message: "Signup success",
    token,
    role: user.role,
    user,
  });
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

    const existingOtp = await Otp.findOne({ email });

    if (existingOtp && existingOtp.expiresAt > Date.now()) {
      return res.status(400).json({ message: "OTP already sent, wait..." });
    }

    // 🔥 delete old OTP
    await Otp.deleteMany({ email });

    // 🔥 save new OTP
    await Otp.create({
      email,
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    // 🔥 HTML EMAIL
    const html = `
      <div style="font-family: Arial; background:#f4f6f8; padding:20px;">
        <div style="max-width:500px; margin:auto; background:white; padding:30px; border-radius:10px; text-align:center;">
          
          <h2 style="color:#6C5CE7;">📖 EduBloom</h2>
          
          <p style="font-size:16px;">Your One-Time Password (OTP)</p>
          
          <div style="
            background: linear-gradient(90deg, #6C5CE7, #a29bfe);
            color:white;
            padding:10px;
            border-radius:8px;
            display:inline-block;
            font-size:22px;
            letter-spacing:3px;
          ">
            ${otp}
          </div>
          
          <p style="color:gray;">Valid for 5 minutes ⏳</p>
          
          <hr style="margin:20px 0;" />
          
          <p style="font-size:12px; color:#999;">
            If you didn’t request this, ignore this email.
          </p>
        </div>
      </div>
    `;

    // 🔥 send ONLY ONCE
    await sendEmail(email, "Your OTP - EduBloom", html);

    res.json({ message: "OTP sent successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "OTP failed" });
  }
};
