import { Message } from "@/types/chat";

type MessageItemProps = {
  message: Message;
};
export function MessageItem({message}: MessageItemProps) {
    return (
        <div className ={message.role === "user" ? "user-message-item" : "ai-message-item"}>
            {message.content}
        </div>
    );
} 