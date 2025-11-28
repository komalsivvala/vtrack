import React, { useState } from "react";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    // Add user message
    setChat((prev) => [...prev, { sender: "user", text: message }]);

    try {
      const res = await fetch("http://localhost:3003/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      // Add bot message
      setChat((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Server is not reachable." },
      ]);
    }

    setMessage("");
  };

  return React.createElement(
    "div",
    { style: { width: "400px", margin: "auto" } },

    React.createElement("h2", null, "VTrack Chatbot"),

    // Chat Window
    React.createElement(
      "div",
      {
        style: {
          height: "300px",
          border: "1px solid #c53838ff",
          padding: "10px",
          overflowY: "scroll",
          marginBottom: "10px",
        },
      },
      chat.map((msg, i) =>
        React.createElement(
          "p",
          {
            key: i,
            style: {
              textAlign: msg.sender === "user" ? "right" : "left",
              backgroundColor: msg.sender === "user" ? "#d1e7ff" : "#eee",
              padding: "6px",
              borderRadius: "6px",
            },
          },
          msg.text
        )
      )
    ),

    // Input Field
    React.createElement("input", {
      type: "text",
      placeholder: "Type message...",
      value: message,
      onChange: (e) => setMessage(e.target.value),
      style: { width: "75%", padding: "8px" },
    }),

    // Send Button
    React.createElement(
      "button",
      {
        onClick: sendMessage,
        style: {
          width: "20%",
          padding: "8px",
          marginLeft: "5px",
          background: "#007bff",
          color: "#fff",
        },
      },
      "Send"
    )
  );
}

export default Chatbot;
