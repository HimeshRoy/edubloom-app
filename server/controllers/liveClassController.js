import LiveClass from "../models/LiveClass.js";

export const getLiveClasses = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const classes = await LiveClass.find({
      date: { $gte: today },
    }).sort({ time: 1 });

    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching classes" });
  }
};