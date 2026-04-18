import fetch from "node-fetch";

export const askAI = async (req, res) => {
  try {
    const { question } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [
          { role: "user", content: question }
        ]
      })
    });

    const data = await response.json();

    res.json({
      answer: data.choices[0].message.content
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "AI error" });
  }
};