"use client";

import { StreamableValue } from "ai/rsc";
import { useStreamableText } from "@/lib/hooks/use-streamable-text";
import { Skeleton } from "../ui/skeleton";

// Different types of message bubbles.
export function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full group relative flex gap-3 items-center justify-end">
      <div className="max-w-fit px-4 py-2 flex-1 text-right border bg-card rounded-bl-md rounded-t-md text-balance">
        {children}
      </div>
    </div>
  );
}

export function GenerativeYTMessage({
  content,
}: {
  content: string | StreamableValue<string>;
  className?: string;
}) {
  const text = useStreamableText(content);

  return (
    <div className="w-full group relative flex gap-3 items-center justify-start">
      <div className="max-w-[500px] px-4 py-2 flex-1 text-left border rounded-br-md rounded-t-md text-balance">
        {text}
      </div>
    </div>
  );
}

export function GenerativeYTCard({
  children,
}: {
  children: React.ReactNode;
  showAvatar?: boolean;
}) {
  return (
    <div className="w-full group relative flex gap-3 items-center justify-start">
      <div className="max-w-[500px] px-4 py-2 flex-1 text-left border rounded-br-md rounded-t-md text-balance">
        {children}
      </div>
    </div>
  );
}

export function SystemMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full group relative flex gap-3 items-center justify-center">
      <div className="max-w-[600px] px-4 py-2 flex-1 text-center border rounded-md text-balance">
        {children}
      </div>
    </div>
  );
}

export function SkeletonMessage() {
  return (
    <div className="w-full group relative flex gap-3 items-center justify-start">
      <div className="w-full p-4 flex flex-1 flex-col gap-1 text-left border rounded-br-md rounded-t-md text-balance">
        <Skeleton className="w-full h-2" />
        <Skeleton className="w-full h-5" />
      </div>
    </div>
  );
}
