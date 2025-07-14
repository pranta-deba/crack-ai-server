const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

const GoogleGenAI = require("@google/genai");
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.get("/", (req, res) => {
  res.send({ data: "Server is running", status: 200 });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
