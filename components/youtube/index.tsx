"use client";

import { SkeletonCard } from "@/components/youtube/last-month-views";
import dynamic from "next/dynamic";

const ViewsTable = dynamic(
  () =>
    import("@/components/youtube/last-month-views").then(
      (mod) => mod.LastMonthViewsCard
    ),
  {
    ssr: false,
    loading: () => <SkeletonCard />,
  }
);

export { ViewsTable };
