import User from "../models/User.js";
import LiveClass from "../models/LiveClass.js";


export const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayClasses = await LiveClass.find({
      date: { $gte: today },
    }).limit(3);

    const subjects = ["Maths", "Physics", "Chemistry", "Biology"];

    res.json({
      name: user.name,
      studentId: user.studentId,

      stats: {
        courses: subjects.length, // ✅ 4
        hours: user.totalHours || 0,
        streak: user.streak || 0,
      },

      todayClasses,
      analytics: [
        { day: "Mon", hours: 0 },
        { day: "Tue", hours: 0 },
        { day: "Wed", hours: 0 },
        { day: "Thu", hours: 0 },
        { day: "Fri", hours: 0 },
      ],
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};