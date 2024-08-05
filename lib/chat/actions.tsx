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
import {
  getAllTimeComments,
  getAllTimeLikes,
  getAllTimeSubscribers,
  getAllTimeViews,
  getLastMonthComments,
  getLastMonthLikes,
  getLastMonthSubscribers,
  getLastMonthViews,
} from "@/actions/youtube";
import {
  GenerativeYTCard,
  GenerativeYTMessage,
  SkeletonMessage,
  UserMessage,
} from "@/components/chat/message";
import { ViewsTable } from "@/components/youtube";
import { LastMonthLikesCard } from "@/components/youtube/last-month-likes";
import { LastMonthCommentsCard } from "@/components/youtube/last-month-comments";
import { LastMonthSubscribersCard } from "@/components/youtube/last-month-subscribers";
import { TotalCard } from "@/components/youtube/total-card";

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
    initial: <SkeletonMessage />,
    system: `\
    You are a youtube anaalitycs expert and you can help users with their youtube channel, step by step, your name is GenerativeYT.
    You and the user can discuss views, likes, and comments on videos, if the message is not about youtube, you can respond that you are a demo and cannot do that.
    
    If the user requests his total views for the last month, call \`get_total_last_month_views\`.
    If the user request his all-time total views, call \`get_total_views\`.
    If the user request his total likes for the last month, call \`get_total_last_month_likes\`.
    If the user request his all-time total likes, call \`get_total_likes\`.
    If the user request his total comments for the last month, call \`get_total_last_month_comments\`.
    If the user request his all-time total comments, call \`get_total_comments\`.
    If the user request his total subscribers for the last month, call \`get_total_last_month_subscribers\`.
    If the user request his all-time total subscribers, call \`get_total_subscribers


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
            <GenerativeYTCard>
              <SkeletonCard />
            </GenerativeYTCard>
          );

          await sleep(1000);

          const toolCallId = nanoid();

          const views = await getLastMonthViews();

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
            <GenerativeYTCard>
              <LastMonthViewsCard data={views} />
            </GenerativeYTCard>
          );
        },
      },
      getTotalLastMonthLikes: {
        description: "Get the total likes of the last month.",
        parameters: z.object({}),
        generate: async function* () {
          yield (
            <GenerativeYTCard>
              <SkeletonCard />
            </GenerativeYTCard>
          );

          await sleep(1000);

          const toolCallId = nanoid();

          const likes = await getLastMonthLikes();

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
                    toolName: "getTotalLastMonthLikes",
                    toolCallId,
                    args: { likes },
                  },
                ],
              },
              {
                id: nanoid(),
                role: "tool",
                content: [
                  {
                    type: "tool-result",
                    toolName: "getTotalLastMonthLikes",
                    toolCallId,
                    result: likes,
                  },
                ],
              },
            ],
          });

          return (
            <GenerativeYTCard>
              <LastMonthLikesCard data={likes} />
            </GenerativeYTCard>
          );
        },
      },
      getTotalLastMonthComments: {
        description: "Get the total comments of the last month.",
        parameters: z.object({}),
        generate: async function* () {
          yield (
            <GenerativeYTCard>
              <SkeletonCard />
            </GenerativeYTCard>
          );

          await sleep(1000);

          const toolCallId = nanoid();

          const comments = await getLastMonthComments();

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
                    toolName: "getTotalLastMonthComments",
                    toolCallId,
                    args: { comments },
                  },
                ],
              },
              {
                id: nanoid(),
                role: "tool",
                content: [
                  {
                    type: "tool-result",
                    toolName: "getTotalLastMonthComments",
                    toolCallId,
                    result: comments,
                  },
                ],
              },
            ],
          });

          return (
            <GenerativeYTCard>
              <LastMonthCommentsCard data={comments} />
            </GenerativeYTCard>
          );
        },
      },
      getTotalLastMonthSubscribers: {
        description: "Get the total subscribers of the last month.",
        parameters: z.object({}),
        generate: async function* () {
          yield (
            <GenerativeYTCard>
              <SkeletonCard />
            </GenerativeYTCard>
          );

          await sleep(1000);

          const toolCallId = nanoid();

          const subs = await getLastMonthSubscribers();

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
                    toolName: "getTotalLastMonthSubscribers",
                    toolCallId,
                    args: { subs },
                  },
                ],
              },
              {
                id: nanoid(),
                role: "tool",
                content: [
                  {
                    type: "tool-result",
                    toolName: "getTotalLastMonthSubscribers",
                    toolCallId,
                    result: subs,
                  },
                ],
              },
            ],
          });

          return (
            <GenerativeYTCard>
              <LastMonthSubscribersCard data={subs} />
            </GenerativeYTCard>
          );
        },
      },
      getTotalViews: {
        description: "Get the total views of the channel.",
        parameters: z.object({}),
        generate: async function* () {
          yield (
            <GenerativeYTCard>
              <SkeletonCard />
            </GenerativeYTCard>
          );

          await sleep(1000);

          const toolCallId = nanoid();

          const views = await getAllTimeViews();

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
                    toolName: "getTotalViews",
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
                    toolName: "getTotalViews",
                    toolCallId,
                    result: views,
                  },
                ],
              },
            ],
          });

          return (
            <GenerativeYTCard>
              <TotalCard data={views} label="views" />
            </GenerativeYTCard>
          );
        },
      },
      getTotalLikes: {
        description: "Get the total likes of the channel.",
        parameters: z.object({}),
        generate: async function* () {
          yield (
            <GenerativeYTCard>
              <SkeletonCard />
            </GenerativeYTCard>
          );

          await sleep(1000);

          const toolCallId = nanoid();

          const likes = await getAllTimeLikes();

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
                    toolName: "getTotalLikes",
                    toolCallId,
                    args: { likes },
                  },
                ],
              },
              {
                id: nanoid(),
                role: "tool",
                content: [
                  {
                    type: "tool-result",
                    toolName: "getTotalLikes",
                    toolCallId,
                    result: likes,
                  },
                ],
              },
            ],
          });

          return (
            <GenerativeYTCard>
              <TotalCard data={likes} label="likes" />
            </GenerativeYTCard>
          );
        },
      },
      getTotalComments: {
        description: "Get the total comments of the channel.",
        parameters: z.object({}),
        generate: async function* () {
          yield (
            <GenerativeYTCard>
              <SkeletonCard />
            </GenerativeYTCard>
          );

          await sleep(1000);

          const toolCallId = nanoid();

          const comments = await getAllTimeComments();

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
                    toolName: "getTotalComments",
                    toolCallId,
                    args: { comments },
                  },
                ],
              },
              {
                id: nanoid(),
                role: "tool",
                content: [
                  {
                    type: "tool-result",
                    toolName: "getTotalComments",
                    toolCallId,
                    result: comments,
                  },
                ],
              },
            ],
          });

          return (
            <GenerativeYTCard>
              <TotalCard data={comments} label="comments" />
            </GenerativeYTCard>
          );
        },
      },
      getTotalSubscribers: {
        description: "Get the total subscribers of the channel.",
        parameters: z.object({}),
        generate: async function* () {
          yield (
            <GenerativeYTCard>
              <SkeletonCard />
            </GenerativeYTCard>
          );

          await sleep(1000);

          const toolCallId = nanoid();

          const subs = await getAllTimeSubscribers();

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
                    toolName: "getTotalSubscribers",
                    toolCallId,
                    args: { subs },
                  },
                ],
              },
              {
                id: nanoid(),
                role: "tool",
                content: [
                  {
                    type: "tool-result",
                    toolName: "getTotalSubscribers",
                    toolCallId,
                    result: subs,
                  },
                ],
              },
            ],
          });

          return (
            <GenerativeYTCard>
              <TotalCard data={subs} label="subscribers" />
            </GenerativeYTCard>
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
              <GenerativeYTCard>
                {/* TODO: Infer types based on the tool result*/}
                {/* @ts-expect-error */}
                <ViewsTable props={tool.result} />
              </GenerativeYTCard>
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
