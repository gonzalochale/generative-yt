"use server";

import { streamUI } from "ai/rsc";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import moment from "moment";
import { getYouTubeAnalytics } from "@/lib/youtube";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSupabaseAuth } from "@/lib/auth";
import { signOutAction } from "./user";

const LoadingComponent = () => (
  <Skeleton className="w-full p-4 flex gap-1">
    <div className="w-1/4 h-5 bg-gray-200 rounded"></div>
    <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
    <div className="w-1/4 h-5 bg-gray-200 rounded"></div>
    <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
    <div className="w-1/4 h-5 bg-gray-200 rounded"></div>
    <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
  </Skeleton>
);

const getViews = async () => {
  const today = new Date();
  const currentDay = moment(today).format("YYYY-MM-DD");
  const lastMonth = moment(today).subtract(1, "month").format("YYYY-MM-DD");

  const youtubeAnalitycs = await getYouTubeAnalytics();

  const { data } = await youtubeAnalitycs.reports.query({
    ids: "channel==MINE",
    startDate: lastMonth,
    endDate: currentDay,
    metrics: "views",
  });

  return data as viewsData;
};

type viewsData = {
  kind: string;
  columnHeaders: { name: string; columnType: string; dataType: string }[];
  rows: number[][];
};

interface ViewsTableProps {
  data: viewsData;
}
const ViewsTable = ({ data }: ViewsTableProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Views Last Month</CardTitle>
      <CardDescription>
        {data.rows.map((row, index) => (
          <div key={index}>{row[0]} Views Last Month</div>
        ))}
      </CardDescription>
    </CardHeader>
  </Card>
);

export async function reply(message: string) {
  const session = (await getSupabaseAuth().getSession()).data.session;

  if (!session || !session.provider_token || !session.provider_refresh_token) {
    await signOutAction();
    return;
  }

  const result = await streamUI({
    model: openai("gpt-4o-mini"),
    messages: [
      {
        role: "system",
        content: `You are an advanced AI assistant specializing in YouTube analytics. Your primary task is to assist with analytics for YouTube channels.

        -When users inquire about their YouTube channel views for the past month(last 28-30 days), use the \getViewsData\ tool to show this data in a component.
        
        -If a user asks for another type of data, you need to tell that you cant help with that and suggest using any of the following sentences:
        Try asking ‘How many views did I get in the last month?’ or ‘Show me my views for the last 28 days’.`,
      },
      {
        role: "user",
        content: message,
      },
    ],
    tools: {
      getViewsData: {
        description:
          "Get the views data from the last month and show it in a component.",
        parameters: z.object({}),
        generate: async function* () {
          yield <LoadingComponent />;
          const viewsData = await getViews();
          return <ViewsTable data={viewsData} />;
        },
      },
    },
    text: ({ content }) => <div>{content}</div>,
  });

  return result.value;
}
