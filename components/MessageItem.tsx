import { Message } from "@/types/chat";
export function MessageItem({message}: Message) => {
    return (
        <div className ={message.role === "user" ? "user-message-item" : "ai-message-item"}>
            {message.content}
        </div>
    );
} 