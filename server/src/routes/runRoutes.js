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

    // ✅ 1. Create submission (Judge0 official free API, no API key)
    const { data: submission } = await axios.post(
      "https://ce.judge0.com/submissions/?base64_encoded=false&wait=false",
      {
        source_code: code,
        language_id: langId,
        stdin: "",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const token = submission.token;

    // ✅ 2. Poll until execution is complete
    let result;
    do {
      await new Promise((r) => setTimeout(r, 1500));
      result = await axios.get(
        `https://ce.judge0.com/submissions/${token}?base64_encoded=false`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } while (result.data.status.id <= 2);

    // ✅ 3. Send back output
    res.json({
      output:
        result.data.stdout ||
        result.data.stderr ||
        result.data.compile_output ||
        "No output",
    });
  } catch (err) {
    console.error("Judge0 Error:", err.message);
    res.status(500).json({ error: "Execution failed" });
  }
});

export default router;