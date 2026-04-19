import Message from "../models/Message.js";

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Error fetching messages" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { question, subject } = req.body;

    const msg = await Message.create({
      userId: req.user.id,
      question,
      subject,
    });

    res.json(msg);
  } catch (err) {
    res.status(500).json({ message: "Error sending message" });
  }
};