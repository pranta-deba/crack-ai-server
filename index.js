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
app.use(express.urlencoded({ extended: true }));

const generateTextWithGemini = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text;
    return text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate text from AI. Please try again later.");
  }
};

const form = `
  <form method="POST" action="/prompt" style="max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; background-color: #f9f9f9;">
    <textarea 
      name="prompt" 
      id="prompt" 
      rows="4" 
      cols="50" 
      placeholder="Enter your prompt here" 
      required 
      style="width: 100%; padding: 10px; border-radius: 4px; border: 1px solid #ccc; resize: vertical; box-sizing: border-box;">
    </textarea>
    <button 
      type="submit" 
      style="margin-top: 10px; padding: 10px 20px; background-color: #007BFF; color: white; border: none; border-radius: 4px; cursor: pointer;">
      Submit
    </button>
  </form>
`;

app.get("/", (req, res) => {
  res.send({ data: "Server is running", status: 200 });
});

app.get("/prompt", async (req, res) => {
  res.send(form);
});

app.post("/prompt", async (req, res) => {
  const { prompt } = req.body;
  console.log(prompt);
  res.send({ data: prompt, status: 200 });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
