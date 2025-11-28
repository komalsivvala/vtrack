import ollama from "ollama";
import fs from "fs";

const POLICIES = fs.readFileSync(new URL("./policies.txt", import.meta.url), "utf8");

export async function askChatbot(userMessage) {
  try {
    const response = await ollama.generate({
      model: "qwen2.5:1.5b",
      prompt: `${POLICIES}\n\nUser: ${userMessage}\nAssistant:`,
      stream: false
    });

    return response.response;
  } catch (error) {
    console.error("Chatbot Error:", error);
    return "⚠️ Chatbot is not available right now.";
  }
}
