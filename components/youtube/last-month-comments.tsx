"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { commentsData } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import moment from "moment";

export const SkeletonCard = () => {
  return (
    <div className="w-full flex flex-col gap-3">
      <Skeleton className="h-10 w-full rounded-md" />
      <Skeleton className="h-20 w-full rounded-md" />
      <Skeleton className="h-14 w-full rounded-md" />
    </div>
  );
};

interface CommentsCardProps {
  data: commentsData[];
}

const chartConfig = {
  views: {
    label: "Views",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export const LastMonthCommentsCard = ({ data }: CommentsCardProps) => {
  const totalComments = data.reduce((acc, { comments }) => acc + comments, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{totalComments} comments last month</CardTitle>
        <CardDescription>
          Now i know how many comments you got last month, you can ask me about
          it
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 20,
              right: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => moment(value).format("DD MMM")}
              interval={2}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Area dataKey="likes" type="bump" fillOpacity={0.4} stackId="a" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
