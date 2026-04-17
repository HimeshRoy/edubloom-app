import User from "../models/User.js";

export const generateStudent = async (studentClass) => {
  const year = new Date().getFullYear().toString().slice(-2);

  const count = await User.countDocuments({ class: studentClass });

  const serial = (count + 1).toString().padStart(2, "0");

  const studentId = `${year}${studentClass}${serial}`;
  const studentEmail = `${studentId}@edubloom.edu`;

  return { studentId, studentEmail };
};