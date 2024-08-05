"use client";

import Textarea from "react-textarea-autosize";
import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@/components/ui/icons";
import { useEnterSubmit } from "@/lib/hooks/use-enter-submit";
import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LoginButton from "@/components/auth/login-button";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";

export function SampleChat() {
  const { formRef, onKeyDown } = useEnterSubmit();
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const exampleMessages = [
    {
      heading: "How many",
      subheading: "views did i get the last month?",
      message: `How many views did I get the last month?`,
    },
    {
      heading: "How many",
      subheading: "likes did i get the last month?",
      message: `How many likes did I get the last month?`,
    },
    {
      heading: "How many",
      subheading: "comments did my channel get all time?",
      message: `How many comments did my channel get all time?`,
    },
    {
      heading: "How many",
      subheading: "subscribers did my channel get all time?",
      message: `How many subscribers did my channel get all time?`,
    },
  ];

  return (
    <div className="group grow w-full overflow-auto pl-0 flex flex-col items-center justify-between peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
      <div className="pb-[100px] pt-4 md:pt-10 w-full"></div>
      <div className="w-full absolute z-50 bottom-0">
        <div className="mx-auto sm:max-w-2xl px-4">
          <div className="mb-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {exampleMessages.map((example) => (
              <Card
                className="hover:cursor-pointer hover:bg-muted"
                key={example.heading}
                onClick={async () => {
                  setModal(true);
                }}
              >
                <CardHeader>
                  <CardDescription className="text-foreground">
                    {example.heading}
                  </CardDescription>
                  <CardDescription>{example.subheading}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <form
            ref={formRef}
            className="relative pb-2"
            onSubmit={async (e: any) => {
              e.preventDefault();
              setModal(true);
            }}
          >
            <Textarea
              ref={inputRef}
              tabIndex={0}
              onKeyDown={onKeyDown}
              placeholder="Hey GenerativeYT, how many..."
              className="min-h-[60px] w-full resize-none focus-within:outline-none sm:text-sm rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-20"
              autoFocus
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              name="message"
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              type="submit"
              size="icon"
              disabled={input === ""}
              className="z-50 absolute right-2 bottom-6 rounded-full"
            >
              <IconArrowRight />
            </Button>
          </form>
        </div>
      </div>
      <Dialog open={modal} onOpenChange={setModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>You need to be logged.</DialogTitle>
            <DialogDescription>
              Please sign in to chat with GenerativeYT.
            </DialogDescription>
          </DialogHeader>

          <div className="w-full flex justify-center py-10">
            <LoginButton />
          </div>

          <DialogFooter>
            <DialogClose>
              <Button variant="outline" size="sm">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
