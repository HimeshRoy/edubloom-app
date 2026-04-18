import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const askAI = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Question required" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful CBSE student tutor. Explain simply.",
        },
        {
          role: "user",
          content: question,
        },
      ],
    });

    res.json({
      answer: response.choices[0].message.content,
    });

  } catch (err) {
    console.log("AI ERROR 👉", err);
    res.status(500).json({ message: "AI error" });
  }
};