import styles from "./page.module.css";
import { MessageItem } from "@/components/MessageItem";

export default function Home() {

  const messages = [
    { id: "1", role: "user", content: "hello", timestamp: Date.now() },
    { id: "2", role: "assistant", content: "hi there!", timestamp: Date.now() },
  ]
  return (
    <div className="chat-container">
      <div className="chat-header">AI Chat App</div>
      <div className="chat-messages">
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </div>
      <div className="chat-input">
        <textarea placeholder="Ask Question to AI..." />
        <button>Send</button>
      </div>
    </div>
  );
}
