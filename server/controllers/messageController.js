import Message from "../models/Message.js";

// 📤 CREATE
export const sendMessage = async (req, res) => {
  try {
    const { text, receiverId, isAnnouncement } = req.body;

    const senderId = req.user.id;

    const msg = await Message.create({
      text,
      senderId,
      receiverId: receiverId || null,
      isAnnouncement: isAnnouncement || false,
    });

    req.app.get("io").emit("new_message", msg);

    res.json(msg);
  } catch (err) {
    res.status(500).json({ message: "Send failed" });
  }
};

// getAnnouncements
export const getAnnouncements = async (req, res) => {
  try {
    const messages = await Message.find({
      isAnnouncement: true,
    }).sort({ createdAt: -1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
};

// 📥 GET
export const getChat = async (req, res) => {
  try {
    const me = req.user.id;
    const other = req.params.userId;

    const messages = await Message.find({
      $or: [
        { senderId: me, receiverId: other },
        { senderId: other, receiverId: me },
      ],
    }).sort({ createdAt: 1 });

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