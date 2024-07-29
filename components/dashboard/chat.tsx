"use client";

import { streamLastMontviews } from "@/actions/ai";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

export const maxDuration = 30;

const Chat = () => {
  const [component, setComponent] = useState<React.ReactNode>();

  return (
    <section className="flex flex-col flex-1 gap-5 w-full h-full max-w-xl justify-between">
      <div className="w-full flex flex-col gap-3">
        <div className="flex gap-3">
          <Card
            className="hover:cursor-pointer"
            onClick={async (e) => {
              e.preventDefault();
              setComponent(await streamLastMontviews());
            }}
          >
            <CardHeader>
              <CardTitle>Views Last Month</CardTitle>
              <CardDescription>
                Get the views from the last month
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="h-full flex flex-col flex-1 overflow-y-auto">
          {component}
        </div>
      </div>
    </section>
  );
};

export default Chat;
