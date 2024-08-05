"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonCard = () => {
  return (
    <div className="w-full flex flex-col gap-3">
      <Skeleton className="h-10 w-full rounded-md" />
      <Skeleton className="h-20 w-full rounded-md" />
      <Skeleton className="h-14 w-full rounded-md" />
    </div>
  );
};

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
