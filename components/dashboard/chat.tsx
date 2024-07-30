"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { reply } from "@/actions/ai";
import { Input } from "@/components/ui/input";

export const maxDuration = 30;

const Chat = () => {
  const [messages, setMessages] = useState<
    { type: "user" | "ai"; text: string }[]
  >([]);

  const handleSubmit = async (formData: FormData) => {
    const message = formData.get("message") as string;

    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", text: message },
    ]);

    const aiReply = (await reply(message)) as string;
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "ai", text: aiReply },
    ]);

    return;
  };

  return (
    <section className="flex flex-col flex-1 gap-5 w-full h-full max-w-xl justify-between">
      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {messages.map((msg, index) => (
            <li
              key={index}
              className={`flex ${
                msg.type === "ai" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`p-3 rounded-lg ${
                  msg.type === "ai" ? "bg-card border" : "border text-white"
                }`}
              >
                {msg.text}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <form action={handleSubmit} className="flex gap-2 items-center">
        <Input
          type="text"
          name="message"
          id="message"
          placeholder="Type a message"
          required
        />
        <Button type="submit">Send</Button>
      </form>
    </section>
  );
};

export default Chat;
