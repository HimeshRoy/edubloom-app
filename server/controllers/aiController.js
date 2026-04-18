import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const askAI = async (req, res) => {
  try {
    const { question } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(
      `You are a CBSE Class 10 tutor. Explain clearly:\n${question}`
    );

    const response = result.response.text();

    res.json({ answer: response });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "AI error" });
  }
};