import * as React from "react";

import { PromptForm } from "@/components/prompt-form";
import { useActions, useUIState } from "ai/rsc";
import type { AI } from "@/lib/chat/actions";
import { nanoid } from "nanoid";
import { UserMessage } from "@/components/chat/message";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";

export interface ChatPanelProps {
  input: string;
  setInput: (value: string) => void;
}

export function ChatPanel({ input, setInput }: ChatPanelProps) {
  const [messages, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions();

  const exampleMessages = [
    {
      heading: "How many",
      subheading: "views did i get the last month?",
      message: `How many views did I get the last month?`,
    },
    {
      heading: "How many",
      subheading: "likes did i get the last month?",
      message: `How many likes did I get the last month?`,
    },
    {
      heading: "How many",
      subheading: "comments did my channel get all time?",
      message: `How many comments did my channel get all time?`,
    },
    {
      heading: "How many",
      subheading: "subscribers did my channel get all time?",
      message: `How many subscribers did my channel get all time?`,
    },
  ];

  return (
    <div className="w-full absolute z-50 bottom-0">
      <div className="mx-auto sm:max-w-2xl px-4">
        <div className="mb-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {messages.length === 0 &&
            exampleMessages.map((example) => (
              <Card
                className="hover:cursor-pointer hover:bg-muted"
                key={example.heading}
                onClick={async () => {
                  setMessages((currentMessages) => [
                    ...currentMessages,
                    {
                      id: nanoid(),
                      display: <UserMessage>{example.message}</UserMessage>,
                    },
                  ]);

                  const responseMessage = await submitUserMessage(
                    example.message
                  );

                  setMessages((currentMessages) => [
                    ...currentMessages,
                    responseMessage,
                  ]);
                }}
              >
                <CardHeader>
                  <CardDescription className="text-foreground">
                    {example.heading}
                  </CardDescription>
                  <CardDescription>{example.subheading}</CardDescription>
                </CardHeader>
              </Card>
            ))}
        </div>
        <PromptForm input={input} setInput={setInput} />
      </div>
    </div>
  );
}
