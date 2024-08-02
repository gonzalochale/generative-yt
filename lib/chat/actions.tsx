import "server-only";

import {
  createAI,
  createStreamableUI,
  getMutableAIState,
  getAIState,
  streamUI,
  createStreamableValue,
} from "ai/rsc";
import { openai } from "@ai-sdk/openai";

import { z } from "zod";
import { sleep, nanoid } from "@/lib/utils";
import { Chat, Message } from "@/lib/types";
import { getSupabaseAuth, getUser } from "../auth";
import { signOutAction } from "@/actions/user";
import {
  LastMonthViewsCard,
  SkeletonCard,
} from "@/components/youtube/last-month-views";
import { getViews } from "@/actions/youtube";
import {
  BotCard,
  GenerativeYTMessage,
  SpinnerMessage,
  UserMessage,
} from "@/components/chat/message";
import { ViewsTable } from "@/components/youtube";

async function submitUserMessage(content: string) {
  "use server";

  const session = await (await getSupabaseAuth().getSession()).data.session;

  if (!session?.provider_token || !session?.provider_token) {
    await signOutAction();
    return;
  }

  const aiState = getMutableAIState<typeof AI>();

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: "user",
        content,
      },
    ],
  });

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>;
  let textNode: undefined | React.ReactNode;

  const result = await streamUI({
    model: openai("gpt-4o-mini"),
    initial: <SpinnerMessage />,
    system: `\
    You are a youtube anaalitycs expert and you can help users with their youtube channel, step by step.
    You and the user can discuss views, likes, and comments on videos.
    
    Messages inside [] means that it's a UI element or a user event. For example:
    - "[Price of AAPL = 100]" means that an interface of the stock price of AAPL is shown to the user.
    - "[User has changed the amount of AAPL to 10]" means that the user has changed the amount of AAPL to 10 in the UI.
    
    If the user requests his total views for the last month, call \`get_total_last_month_views\`.
    If the user wants to mutate any data on the channel, or complete another impossible task, respond that you are a demo and cannot do that.
    
    Besides that, you can also chat with users and do some calculations if needed.`,
    messages: [
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name,
      })),
    ],
    text: ({ content, done, delta }) => {
      if (!textStream) {
        textStream = createStreamableValue("");
        textNode = <GenerativeYTMessage content={textStream.value} />;
      }

      if (done) {
        textStream.done();
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: nanoid(),
              role: "assistant",
              content,
            },
          ],
        });
      } else {
        textStream.update(delta);
      }

      return textNode;
    },
    tools: {
      getTotalLastMonthViews: {
        description: "Get the total views of the last month.",
        parameters: z.object({}),
        generate: async function* () {
          yield (
            <BotCard>
              <SkeletonCard />
            </BotCard>
          );

          await sleep(1000);

          const toolCallId = nanoid();

          const views = await getViews();

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: "assistant",
                content: [
                  {
                    type: "tool-call",
                    toolName: "getTotalLastMonthViews",
                    toolCallId,
                    args: { views },
                  },
                ],
              },
              {
                id: nanoid(),
                role: "tool",
                content: [
                  {
                    type: "tool-result",
                    toolName: "getTotalLastMonthViews",
                    toolCallId,
                    result: views,
                  },
                ],
              },
            ],
          });

          return (
            <BotCard>
              <LastMonthViewsCard data={views} />
            </BotCard>
          );
        },
      },
    },
  });

  return {
    id: nanoid(),
    display: result.value,
  };
}

export type AIState = {
  chatId: string;
  messages: Message[];
};

export type UIState = {
  id: string;
  display: React.ReactNode;
}[];

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), messages: [] },
  onGetUIState: async () => {
    "use server";

    const session = await getUser();

    if (session) {
      const aiState = getAIState() as Chat;

      if (aiState) {
        const uiState = getUIStateFromAIState(aiState);
        return uiState;
      }
    } else {
      return;
    }
  },
  onSetAIState: async ({ state }) => {
    "use server";

    const session = await await getUser();

    if (session) {
      const { chatId, messages } = state;

      const createdAt = new Date();
      const userId = session.id as string;
      const path = `/chat/${chatId}`;

      const firstMessageContent = messages[0].content as string;
      const title = firstMessageContent.substring(0, 100);

      const chat: Chat = {
        id: chatId,
        title,
        userId,
        createdAt,
        messages,
        path,
      };
    } else {
      return;
    }
  },
});

export const getUIStateFromAIState = (aiState: Chat) => {
  return aiState.messages
    .filter((message) => message.role !== "system")
    .map((message, index) => ({
      id: `${aiState.chatId}-${index}`,
      display:
        message.role === "tool" ? (
          message.content.map((tool) => {
            return tool.toolName === "getTotalLastMonthViews" ? (
              <BotCard>
                {/* TODO: Infer types based on the tool result*/}
                {/* @ts-expect-error */}
                <ViewsTable props={tool.result} />
              </BotCard>
            ) : null;
          })
        ) : message.role === "user" ? (
          <UserMessage>{message.content as string}</UserMessage>
        ) : message.role === "assistant" &&
          typeof message.content === "string" ? (
          <GenerativeYTMessage content={message.content} />
        ) : null,
    }));
};
