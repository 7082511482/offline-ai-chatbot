import { useState } from "react";
import knowledge from "../data/knowledge";

function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const getReply = (text) => {
    text = text.toLowerCase();

    for (let item of knowledge) {
      for (let key of item.keywords) {
        if (text.includes(key)) {
          return item.answer;
        }
      }
    }
    return "Sorry, I don't understand that yet.";
  };

  const sendMessage = () => {
    if (!input) return;

    const userMsg = { role: "user", content: input };
    const botMsg = { role: "assistant", content: getReply(input) };

    setMessages([...messages, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div className="chat-box">
      {messages.map((m, i) => (
        <div key={i} className={m.role}>
          <b>{m.role === "user" ? "You" : "AI"}:</b> {m.content}
        </div>
      ))}

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
