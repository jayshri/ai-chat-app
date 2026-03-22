"use client";

import { useEffect, useRef, useState } from "react";
import { Message } from "@/types/chat";
import { MessageItem } from "@/components/MessageItem";

export default function Home() {

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setError(null);
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
    try{
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
    } catch(error) {
      setError("Failed to fetch AI response. Please try again.");
      setIsLoading(false);
      return;
    }
    
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

  //clear chat messages when clear button is clicked.
  const clearMessages = () => {
      if(messages.length > 0) {
        setMessages([]);
        localStorage.removeItem("chat_messages");
    }
  }

  const handleKeyDown = (e : React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }
  // scroll to the bottom of the chat messages whenever new message is added. 
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="chat-container">
      <div className="chat-header">AI Chat App
        <button className="clear-button" 
          onClick={clearMessages}
          aria-label="Clear chat history"> Clear </button>
      </div>
      
      <div className="chat-messages"
        role="log"
        aria-live="polite"
        aria-label="Chat messages"
      >
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
        {isLoading && <div className="loading" aria-label="Loading response">Loading...</div>}
        <div ref={messagesEndRef} />
      </div>
      {error && (
        <div className="error" role="alert">
          {error}
          <button aria-label="Dismiss error" onClick={() => setError(null)}>dismiss</button>
        </div>
      )}
      <div className="chat-input">
        <textarea value={input} 
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Message input"
          disabled={isLoading}
          placeholder="Ask Question to AI..." />
        <button onClick={handleSubmit} 
          disabled={isLoading}
          aria-label={isLoading ? "Sending message" : "Send message"}
        >
          {isLoading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
