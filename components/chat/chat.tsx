"use client";

import { cn } from "@/lib/utils";
import { ChatList } from "@/components/chat/chat-list";
import { ChatPanel } from "@/components/chat/chat-panel";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import { useEffect, useState } from "react";
import { useUIState } from "ai/rsc";
import { Message } from "@/lib/types";
import { useScrollAnchor } from "@/lib/hooks/use-scroll-anchor";
import { AI } from "@/lib/chat/actions";

export interface ChatProps extends React.ComponentProps<"div"> {
  initialMessages?: Message[];
  id?: string;
}

export function Chat({ id, className }: ChatProps) {
  const [input, setInput] = useState("");
  const [messages] = useUIState<typeof AI>();
  const [_, setNewChatId] = useLocalStorage("newChatId", id);

  useEffect(() => {
    setNewChatId(id);
  }, [id, setNewChatId]);

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor();

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages, isAtBottom, scrollToBottom]);

  return (
    <>
      <div
        className="relative grow w-full overflow-auto pl-0 flex flex-col items-center justify-between"
        ref={scrollRef}
      >
        <div
          className={cn("pb-[100px] pt-4 md:pt-10 w-full", className)}
          ref={messagesRef}
        >
          {messages.length ? <ChatList messages={messages} /> : null}

          <div className="w-full h-px" ref={visibilityRef} />
        </div>
      </div>
      <ChatPanel input={input} setInput={setInput} />
    </>
  );
}
