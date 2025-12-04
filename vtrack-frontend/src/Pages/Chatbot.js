import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  InputAdornment,
  Divider,
  useTheme,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
 

  const sendMessage = async () => {
    if (!message.trim()) return;

    setChat((prev) => [...prev, { sender: "user", text: message }]);

    try {
      const res = await fetch("http://localhost:3004/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setChat((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Server is not reachable." },
      ]);
    }

    setMessage("");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url("/assets/vensai-bg.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: "90%",
          maxWidth: "450px",
          p: 3,
          borderRadius: 4,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.05))",
          boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.18)",
        }}
      >
        <Typography variant="h5" textAlign="center" fontWeight="bold" mb={1}>
          VTrack Chatbot
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* Chat Window */}
        <Box
          sx={{
            height: "350px",
            overflowY: "auto",
            p: 2,
            borderRadius: 2,
            border: "1px solid rgba(255,255,255,0.3)",
            mb: 2,
            background: "rgba(255,255,255,0.2)",
          }}
        >
          {chat.map((msg, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                mb: 1,
              }}
            >
              <Box
                sx={{
                  p: 1.2,
                  maxWidth: "75%",
                  bgcolor: msg.sender === "user" ? "#d1e7ff" : "#f3f3f3",
                  borderRadius: 3,
                  fontSize: "14px",
                }}
              >
                {msg.text}
              </Box>
            </Box>
          ))}
        </Box>

        {/* Message Input */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            fullWidth
            placeholder="Type message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            variant="outlined"
            sx={{
              bgcolor: "white",
              borderRadius: 2,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton color="primary" onClick={sendMessage}>
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
}

export default Chatbot;
