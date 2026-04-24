import csv from "csv-parser";
import fs from "fs";
import Test from "../models/Test.js";

export const uploadCSV = (req, res) => {
  const results = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      const test = await Test.findById(req.params.id);

      results.forEach((q, index) => {
        let correctIndex = parseInt(q.correct);

        if (isNaN(correctIndex) && q.answer) {
          const options = [
            q.option1,
            q.option2,
            q.option3,
            q.option4,
          ];

          correctIndex = options.findIndex(
            (opt) =>
              opt?.toString().trim().toLowerCase() ===
              q.answer.toString().trim().toLowerCase()
          );
        }

        if (!q.question || correctIndex === -1) {
          console.log("❌ SKIPPED ROW:", index, q);
          return;
        }

        test.questions.push({
          question: q.question,
          image: q.image || "",
          options: [
            q.option1,
            q.option2,
            q.option3,
            q.option4,
          ],
          correct: correctIndex,
        });
      });

      // 🔥 AUTO CALCULATIONS
      test.totalMarks = test.questions.length * test.marksPerQuestion;
      test.duration =
        (test.questions.length * test.timePerQuestion) / 60;

      await test.save();

      res.json({ message: "CSV uploaded successfully" });
    });
};