import fetch from "node-fetch";
import pdf from "pdf-parse";

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
                model: "meta-llama/llama-3.3-70b-instruct",
                messages: [
                    { role: "user", content: question }
                ]
            })
        });

        const data = await response.json();

        console.log("AI RESPONSE 👉", data); // DEBUG

        if (!data.choices || !data.choices.length) {
            return res.status(500).json({
                message: "AI failed",
                debug: data
            });
        }

        res.json({
            answer: data.choices[0].message?.content || "No response"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "AI error" });
    }
};

export const askImageAI = async (req, res) => {
  try {
    const { image } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemma-3-4b-it:free",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "Explain this image clearly" },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${image}`,
                },
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();

    res.json({
      answer: data.choices[0].message.content,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Image AI failed" });
  }
};

export const askPDFAI = async (req, res) => {
  try {
    const pdfParse = (await import("pdf-parse")).default;
    const pdfBuffer = req.file.buffer;

    const data = await pdfParse(pdfBuffer);

    const text = data.text.slice(0, 5000); // limit (important ⚠️)

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemma-3-4b-it:free",
        messages: [
          {
            role: "user",
            content: `Explain this PDF in simple terms:\n${text}`,
          },
        ],
      }),
    });

    const result = await response.json();

    res.json({
      answer: result.choices[0].message.content,
    });

  } catch (err) {
    console.log("PDF ERROR 👉", err);
    res.status(500).json({ message: "PDF AI failed" });
  }
};