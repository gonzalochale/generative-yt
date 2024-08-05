"use client";

import { StreamableValue } from "ai/rsc";
import { useStreamableText } from "@/lib/hooks/use-streamable-text";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IconOpenAI, IconUser } from "../ui/icons";

// Different types of message bubbles.
export function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full relative flex gap-3 items-start justify-end">
      <div className="max-w-[500px] px-4 py-2 flex justify-center items-center text-right bg-card border rounded-lg">
        {children}
      </div>
      <Avatar className="size-7 bg-card border flex items-center justify-center">
        <IconUser className="size-4" />
      </Avatar>
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
    <div className="w-full relative flex gap-3 items-start justify-start">
      <Avatar className="size-7 bg-card border flex items-center justify-center">
        <IconOpenAI className="size-4" />
      </Avatar>
      <div className="max-w-[500px] px-4 py-2 text-left border rounded-lg bg-card">
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
    <div className="w-full relative flex gap-3 items-start justify-start">
      <Avatar className="size-7 bg-card border flex items-center justify-center">
        <IconOpenAI className="size-4" />
      </Avatar>
      <div className="max-w-[500px]">{children}</div>
    </div>
  );
}

export function SystemMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full relative flex gap-3 items-start justify-start">
      <Avatar className="size-7 bg-card border flex items-center justify-center">
        <IconOpenAI className="size-4" />
      </Avatar>
      <div className="max-w-[500px] px-4 py-2 text-center">{children}</div>
    </div>
  );
}

export function SkeletonMessage() {
  return (
    <div className="w-full relative flex gap-3 items-start justify-start">
      <div className="w-[500px] flex flex-col gap-3">
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-20 w-full rounded-md" />
        <Skeleton className="h-14 w-full rounded-md" />
      </div>
    </div>
  );
}
