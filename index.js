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

app.get("/", (req, res) => {
  res.send({ data: "Server is running", status: 200 });
});

app.get("/", (req, res) => {
  res.send({ data: "Server is running", status: 200 });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
