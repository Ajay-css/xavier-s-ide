import express from "express";
import axios from "axios";

const router = express.Router();

const langMap = {
  javascript: 63,
  python: 71,
  java: 62,
  cpp: 54,
  c: 50,
  csharp: 51,
  php: 68,
  go: 60,
  rust: 73,
  ruby: 72,
  swift: 83,
  kotlin: 78,
  typescript: 74,
};

router.post("/", async (req, res) => {
  const { code, language } = req.body;
  try {
    const langId = langMap[language] || 63;

    // Create submission
    const { data: submission } = await axios.post(
      "https://judge0-ce.p.rapidapi.com/submissions",
      {
        source_code: code,
        language_id: langId,
        stdin: ""
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
        }
      }
    );

    const token = submission.token;

    // Poll until done
    let result;
    do {
      await new Promise(r => setTimeout(r, 1500));
      result = await axios.get(
        `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
        {
          headers: {
            "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
          }
        }
      );
    } while (result.data.status.id <= 2);

    res.json({
      output:
        result.data.stdout ||
        result.data.stderr ||
        result.data.compile_output ||
        "No output",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Execution failed" });
  }
});

export default router;