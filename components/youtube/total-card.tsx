"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ViewsCardProps {
  label: string;
  data: number;
}

export const TotalCard = ({ label, data }: ViewsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {data} {label} all time
        </CardTitle>
        <CardDescription>
          Now i know how many {label} you got all time, you can ask me about it
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
