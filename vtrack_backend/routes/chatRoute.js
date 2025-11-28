const express = require("express");
const router = express.Router();

router.post("/chat", async (req, res) => {
  const { askChatbot } = await import("../chatbot/chatbot.mjs");
  const { message } = req.body;

  if (!message) return res.status(400).json({ error: "Message is required" });

  const reply = await askChatbot(message);
    console.log("User:", message);
  console.log("Bot reply:", reply); 
  res.json({ reply });
});

module.exports = router;
