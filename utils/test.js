const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

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

app.get("/prompt", async (req, res) => {
  res.send(form);
});

app.post("/prompt", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    res.status(400).send({ data: "Prompt is required", status: 400 });
    return;
  }
  try {
    const text = await generateTextWithGemini(prompt);
    res.send({ data: text, status: 200 });
  } catch (error) {
    res.status(500).send({ data: error.message, status: 500 });
  }
});
