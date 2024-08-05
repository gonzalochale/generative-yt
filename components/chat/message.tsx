"use client";

import { StreamableValue } from "ai/rsc";
import { useStreamableText } from "@/lib/hooks/use-streamable-text";
import { Skeleton } from "../ui/skeleton";
import { Avatar } from "../ui/avatar";
import { IconOpenAI, IconUser } from "../ui/icons";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Different types of message bubbles.
export function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        type: "spring",
        duration: 0.3,
        bounce: 0,
      }}
      className="w-full relative flex gap-3 items-start justify-end"
    >
      <div className="max-w-[500px] px-4 py-2 flex justify-center items-center text-right bg-card border rounded-lg">
        {children}
      </div>
      <Avatar className="size-7 bg-card border flex items-center justify-center">
        <IconUser className="size-4" />
      </Avatar>
    </motion.div>
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
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        type: "spring",
        duration: 0.3,
        bounce: 0,
      }}
      className="w-full relative flex gap-3 items-start justify-start"
    >
      <Avatar className="size-7 bg-card border flex items-center justify-center">
        <IconOpenAI className="size-4" />
      </Avatar>
      <div className="max-w-[500px] px-4 py-2 text-left border rounded-lg bg-card">
        {text}
      </div>
    </motion.div>
  );
}

export function GenerativeYTCard({
  children,
}: {
  children: React.ReactNode;
  showAvatar?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        type: "spring",
        duration: 0.3,
        bounce: 0,
      }}
      className="w-full relative flex gap-3 items-start justify-start"
    >
      <Avatar className="size-7 bg-card border flex items-center justify-center">
        <IconOpenAI className="size-4" />
      </Avatar>
      <div className="max-w-[500px]">{children}</div>
    </motion.div>
  );
}

export function SystemMessage({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        type: "spring",
        duration: 0.3,
        bounce: 0,
      }}
      className="w-full relative flex gap-3 items-start justify-start"
    >
      <Avatar className="size-7 bg-card border flex items-center justify-center">
        <IconOpenAI className="size-4" />
      </Avatar>
      <div className="max-w-[500px] px-4 py-2 text-center">{children}</div>
    </motion.div>
  );
}

export function SkeletonMessage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: "spring",
        duration: 0.3,
        bounce: 0,
      }}
      className="w-full relative flex gap-3 items-start justify-start"
    >
      <div className="w-[500px] flex flex-col gap-3">
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-20 w-full rounded-md" />
        <Skeleton className="h-14 w-full rounded-md" />
      </div>
    </motion.div>
  );
}
