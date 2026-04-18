import StudyLog from "../models/StudyLog.js";
import User from "../models/User.js";

export const logStudy = async (req, res) => {
    try {
        const { subject, duration } = req.body;

        // 🧠 save log
        await StudyLog.create({
            userId: req.user.id,
            subject,
            duration,
        });

        // 🔥 update total hours
        const user = await User.findById(req.user.id);

        // 🔥 update total hours
        user.totalHours += duration;

        // 📅 streak logic
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const last = user.lastActiveDate
            ? new Date(user.lastActiveDate)
            : null;

        if (last) {
            last.setHours(0, 0, 0, 0);

            if (last.getTime() === today.getTime() - 86400000) {
                // yesterday active → increase streak
                user.streak += 1;
            } else if (last.getTime() !== today.getTime()) {
                // missed → reset
                user.streak = 1;
            }
        } else {
            user.streak = 1;
        }

        // update last active
        user.lastActiveDate = new Date();

        await user.save();

        res.json({ message: "Study logged successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error logging study" });
    }
};