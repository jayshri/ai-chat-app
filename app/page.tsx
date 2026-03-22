"use client";

import { useEffect, useState } from "react";
import { Message } from "@/types/chat";
import { MessageItem } from "@/components/MessageItem";

export default function Home() {

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {

    if (!input.trim()) return;
    // set loading state to true and disable api call button until response is received back.
    setIsLoading(true);

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
      timestamp: Date.now(),
    };
    // add user message to the chat and clear input textarea
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    // now send the user message to the backend and get the AI response
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [...messages, userMessage].map(({ role, content }) => ({
          role,
          content,
        })),
      }),
    });

    const data = await response.json();
    // create ai response object and add it to the chat and set loading state to false 
    // to enable api call button again.
    const aiResponse: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: data.reply,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, aiResponse]);
    setIsLoading(false);
  }

  // load chat messages from local storage when the component mounts
  useEffect(() => {
    const savedMessages = localStorage.getItem("chat_messages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    // save chat messages to local storage whenever messages changes
    localStorage.setItem("chat_messages", JSON.stringify(messages));
  }, [messages]);


  return (
    <div className="chat-container">
      <div className="chat-header">AI Chat App</div>
      <div className="chat-messages">
        {isLoading && <div className="loading">Loading...</div>}
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </div>
      <div className="chat-input">
        <textarea value={input} 
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Question to AI..." />
        <button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
