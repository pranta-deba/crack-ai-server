const express = require("express");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send({ data: "Server is running", status: 200 });
});

async function generateTextWithGemini(prompt) {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);

    const response = await result.response;

    const text = response.text();
    return text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate text from AI. Please try again later.");
  }
}

app.post("/generate-text", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res
      .status(400)
      .json({ error: "Prompt is required in the request body." });
  }

  try {
    const generatedText = await generateTextWithGemini(prompt);
    res.json({ generatedText: generatedText });
  } catch (error) {
    console.error("Error in /generate-text route:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
