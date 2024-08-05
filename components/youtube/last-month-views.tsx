"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { viewsData } from "@/lib/types";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import moment from "moment";
import { motion } from "framer-motion";

interface ViewsCardProps {
  data: viewsData[];
}

const chartConfig = {
  views: {
    label: "Views",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export const LastMonthViewsCard = ({ data }: ViewsCardProps) => {
  const totalViews = data.reduce((acc, { views }) => acc + views, 0);

  if (totalViews === 0) {
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
                You have no views last month
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
              {totalViews} views last month
            </CardTitle>
            <CardDescription>
              Now i know how many views you got last month, you can ask me about
              it
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
                <Area
                  dataKey="views"
                  type="bump"
                  fillOpacity={0.4}
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </motion.div>
      </Card>
    </motion.div>
  );
};
