import Test from "../models/Test.js";
import Result from "../models/Result.js";

// ✅ CREATE TEST
export const createTest = async (req, res) => {
  try {
    console.log("🔥 BODY:", req.body);

    const {
      title,
      subject,
      className,
      startTime,
      endTime,
      marksPerQuestion,
      timePerQuestion,
      instructions,
    } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title required" });
    }

    const test = await Test.create({
      title,
      subject,
      className,
      startTime: startTime ? new Date(startTime) : null,
      endTime: endTime ? new Date(endTime) : null,
      marksPerQuestion: Number(marksPerQuestion),
      timePerQuestion: Number(timePerQuestion),
      instructions,
    });

    console.log("✅ TEST CREATED:", test._id);

    res.json(test);

  } catch (err) {
    console.log("❌ FULL ERROR:", err); // 🔥 IMPORTANT
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET ALL TESTS (student)
export const getTests = async (req, res) => {
  try {
    const tests = await Test.find({ isPublished: true }).sort({
      startTime: 1,
    });

    res.json(tests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET SINGLE TEST
export const getTest = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);

    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    res.json(test);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const publishTest = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);

    if (!test) return res.status(404).json({ message: "Not found" });

    test.isPublished = true;
    await test.save();

    res.json({ message: "Test published" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTest = async (req, res) => {
  try {
    await Test.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllTestsAdmin = async (req, res) => {
  const tests = await Test.find().sort({ createdAt: -1 });
  res.json(tests);
};

export const submitTest = async (req, res) => {
  try {
    const { testId, answers, userId } = req.body;

    const test = await Test.findById(testId);

    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    let correct = 0;

    test.questions.forEach((q, i) => {
      if (answers[i] === q.correct) correct++;
    });

    const wrong = answers.length - correct;

    const score =
      correct * test.marksPerQuestion -
      wrong * (test.negativeMarks || 0);

    const result = await Result.create({
      userId,
      testId,
      answers,
      score,
      correct,
      wrong,
    });

    res.json({
      message: "Submitted successfully",
      resultId: result._id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getResult = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id);

    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }

    const test = await Test.findById(result.testId);

    res.json({
      result,
      test,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};