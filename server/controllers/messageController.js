import Message from "../models/Message.js";

// 📤 CREATE
export const sendMessage = async (req, res) => {
  try {
    const { text, userId } = req.body;

    const msg = await Message.create({
      text,
      userId: userId || null,
    });

    // 🔥 REALTIME EMIT
    req.app.get("io").emit("new_message", msg);

    res.json(msg);
  } catch (err) {
    res.status(500).json({ message: "Send failed" });
  }
};

// 📥 GET
export const getMessages = async (req, res) => {
  try {
    const userId = req.user.id;

    const messages = await Message.find({
      $or: [{ userId: null }, { userId }],
    }).sort({ createdAt: -1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
};

// ✏️ UPDATE
export const updateMessage = async (req, res) => {
  try {
    const updated = await Message.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text },
      { returnDocument: "after" }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

// ❌ DELETE
export const deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};

// 👁 MARK AS READ
export const markAsRead = async (req, res) => {
  try {
    const userId = req.user.id;

    await Message.findByIdAndUpdate(req.params.id, {
      $addToSet: { readBy: userId },
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Read failed" });
  }
};