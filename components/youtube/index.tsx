"use client";

import dynamic from "next/dynamic";
import { SkeletonMessage } from "../chat/message";

const ViewsTable = dynamic(
  () =>
    import("@/components/youtube/last-month-views").then(
      (mod) => mod.LastMonthViewsCard
    ),
  {
    ssr: false,
    loading: () => <SkeletonMessage />,
  }
);

export { ViewsTable };
