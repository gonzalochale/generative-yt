"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { commentsData } from "@/lib/types";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import moment from "moment";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useActions, useUIState } from "ai/rsc";
import { AI } from "@/lib/chat/actions";
import { nanoid } from "@/lib/utils";
import { UserMessage } from "../chat/message";

interface CommentsCardProps {
  data: commentsData[];
}

const chartConfig = {
  views: {
    label: "Comments",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export const LastMonthCommentsCard = ({ data }: CommentsCardProps) => {
  const [messages, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions();
  const totalComments = data.reduce((acc, { comments }) => acc + comments, 0);

  const examples = [
    {
      heading: "See all time comments",
      subheading: "How many comments did I get all time?",
      message: `How many comments did I get all time?`,
    },
  ];

  if (totalComments === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          duration: 0.7,
          bounce: 0,
        }}
      >
        <Card>
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              duration: 0.3,
              bounce: 0,
              delay: 0.7,
            }}
          >
            <CardHeader>
              <CardTitle className="text-lg">
                You have no comments last month
              </CardTitle>
              <CardDescription>
                But you can ask me about anything else you want to know about
                your channel
              </CardDescription>
            </CardHeader>
          </motion.div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        duration: 0.7,
        bounce: 0,
      }}
    >
      <Card>
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            duration: 0.3,
            bounce: 0,
            delay: 0.7,
          }}
        >
          <CardHeader>
            <CardTitle className="text-lg">
              {totalComments} comments last month
            </CardTitle>
            <CardDescription>
              Now I know how many comments you got last month. You can ask me
              about it
            </CardDescription>
          </CardHeader>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            duration: 0.3,
            bounce: 0,
            delay: 1,
          }}
        >
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
                  interval={5}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <defs>
                  <linearGradient id="fillComments" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--chart-3))"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--chart-3))"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="comments"
                  type="linear"
                  fillOpacity={0.4}
                  fill="url(#fillComments)"
                  stroke="hsl(var(--chart-3))"
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            duration: 0.3,
            bounce: 0,
            delay: 1.3,
          }}
        >
          <CardFooter className="justify-end gap-3">
            {examples.map((example) => (
              <Button
                key={example.heading}
                size="sm"
                variant="ghost"
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
                {example.heading}
              </Button>
            ))}
          </CardFooter>
        </motion.div>
      </Card>
    </motion.div>
  );
};
