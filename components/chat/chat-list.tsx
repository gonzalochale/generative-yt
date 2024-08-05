import { Separator } from "@/components/ui/separator";
import { UIState } from "@/lib/chat/actions";
import { Session } from "@/lib/types";

export interface ChatList {
  messages: UIState;
  session?: Session;
}

export function ChatList({ messages }: ChatList) {
  if (!messages.length) {
    return null;
  }

  return (
    <div className="relative mx-auto max-w-2xl flex flex-col gap-3">
      {messages.map((message, index) => (
        <div key={message.id}>{message.display}</div>
      ))}
    </div>
  );
}
