"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

interface ViewsCardProps {
  label: string;
  data: number;
}

export const TotalCard = ({ label, data }: ViewsCardProps) => {
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
            <CardTitle>
              {data} {label} all time
            </CardTitle>
            <CardDescription>
              Now I know how many {label} you got all time. You can ask me about
              it.
            </CardDescription>
          </CardHeader>
        </motion.div>
      </Card>
    </motion.div>
  );
};
