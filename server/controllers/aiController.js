import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const askAI = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Question required" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(question);

    const response = await result.response;
    const text = response.text();

    res.json({ answer: text });

  } catch (err) {
    console.log("AI ERROR 👉", err);
    res.status(500).json({ message: "AI error" });
  }
  console.log("API KEY 👉", process.env.GEMINI_API_KEY);
};