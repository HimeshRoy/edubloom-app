import User from "../models/User.js";
import LiveClass from "../models/LiveClass.js";


export const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // 🔥 dynamic logic
    const courses = Math.floor(Math.random() * 5) + 3;
    const hours = Math.floor(Math.random() * 50) + 10;
    const streak = Math.floor(Math.random() * 10) + 1;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayClasses = await LiveClass.find({
      date: { $gte: today },
    }).limit(3);

    const analytics = [
      { day: "Mon", hours: Math.random() * 3 },
      { day: "Tue", hours: Math.random() * 3 },
      { day: "Wed", hours: Math.random() * 3 },
      { day: "Thu", hours: Math.random() * 3 },
      { day: "Fri", hours: Math.random() * 3 },
    ];

    res.json({
      name: user.name,
      studentId: user.studentId,

      stats: {
        courses,
        hours,
        streak,
      },

      todayClasses,
      analytics,
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};