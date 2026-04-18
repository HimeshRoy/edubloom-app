export const getDashboard = async (req, res) => {
  try {
    const user = req.user;

    // 🔥 dummy for now (later DB se aayega)
    const data = {
      name: user.name,
      studentId: user.studentId,

      stats: {
        courses: 5,
        hours: 48,
        streak: 7,
      },

      todayClasses: [
        {
          subject: "Math",
          time: "5:00 PM",
        },
      ],

      analytics: [
        { day: "Mon", hours: 1 },
        { day: "Tue", hours: 2 },
        { day: "Wed", hours: 1.5 },
      ],
    };

    res.json(data);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};