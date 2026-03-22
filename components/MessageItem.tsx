import { Message } from "@/types/chat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MessageItemProps = {
  message: Message;
};
export function MessageItem({message}: MessageItemProps) {
    return (
        <div className ={message.role === "user" ? "user-message-item" : "ai-message-item"}>
            {message.role === "assistant" ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
                </ReactMarkdown>
            ) : (message.content)}
        </div>
    );
} 