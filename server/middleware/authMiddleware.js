import jwt from "jsonwebtoken";

export default function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    // console.log("DECODED 👉", decoded);

    next();
  } catch (err) {
    console.log("JWT ERROR 👉", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
}