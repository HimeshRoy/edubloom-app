export const getLiveClasses = async (req, res) => {
  try {
    const classes = [
      {
        id: 1,
        subject: "Math",
        teacher: "Sharma Sir",
        time: "5:00 PM",
        meetLink: "https://meet.google.com/",
      },
    ];

    res.json(classes);
  } catch {
    res.status(500).json({ message: "Error" });
  }
};