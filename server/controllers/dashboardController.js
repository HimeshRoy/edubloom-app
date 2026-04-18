import User from "../models/User.js";
import LiveClass from "../models/LiveClass.js";
import StudyLog from "../models/StudyLog.js";

export const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayClasses = await LiveClass.find({
      date: { $gte: today },
    }).limit(3);

    const subjects = ["Maths", "Physics", "Chemistry", "Biology"];

    let message = "Keep learning 💪";

    if (todayClasses.length === 0) {
      message = "No classes today 😴 revise something!";
    } else if ((user.streak || 0) >= 5) {
      message = "On fire 🔥 keep the streak going!";
    }

    const logs = await StudyLog.find({ userId: req.user.id });

    const analytics = [
      { day: "Mon", hours: 0 },
      { day: "Tue", hours: 0 },
      { day: "Wed", hours: 0 },
      { day: "Thu", hours: 0 },
      { day: "Fri", hours: 0 },
    ];

    logs.forEach((log) => {
      const day = new Date(log.date).toLocaleString("en-US", {
        weekday: "short",
      });

      const found = analytics.find((a) => a.day === day);

      if (found) {
        found.hours += log.duration;
      }
    });

    res.json({
      name: user.name,
      studentId: user.studentId,

      stats: {
        courses: subjects.length, // ✅ 4
        hours: user.totalHours || 0,
        streak: user.streak || 0,
      },

      todayClasses,
      analytics,
      message,
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};