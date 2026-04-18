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