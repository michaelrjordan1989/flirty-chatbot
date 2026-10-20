import React, { useState } from "react";
import flirtyChatbot from "./chatbot";
import userAvatar from "./assets/user.png";
import botAvatar from "./assets/bot.png";

const chatbot = flirtyChatbot();

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { sender: "You", text: input, time: new Date().toLocaleTimeString() };
    const botReply = { sender: "Bot", text: chatbot(input, "michael"), time: new Date().toLocaleTimeString() };
    setMessages([...messages, userMsg, botReply]);
    setInput("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100">
      <h2 className="text-2xl font-bold mb-4 text-pink-700">Flirty Chatbot 💬</h2>
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4 flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-end ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
            >
              {msg.sender === "Bot" && (
                <img src={botAvatar} alt="bot" className="w-8 h-8 rounded-full mr-2" />
              )}
              <div
                className={`p-2 rounded-lg max-w-xs ${
                  msg.sender === "You" ? "bg-pink-200 text-right" : "bg-pink-50 text-left"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <span className="text-xs text-gray-500 block mt-1">{msg.time}</span>
              </div>
              {msg.sender === "You" && (
                <img src={userAvatar} alt="you" className="w-8 h-8 rounded-full ml-2" />
              )}
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border rounded p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="type something..."
          />
          <button
            onClick={handleSend}
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
