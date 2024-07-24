"use client";

import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signOutAction } from "@/actions/user";

const SignOutButton = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      const { errorMessage, url } = await signOutAction();
      if (!errorMessage && url) {
        toast.error("You have been logged out");
      } else {
        toast.error(errorMessage);
      }
    });
  };

  return (
    <Button
      variant="destructive"
      className="flex gap-2 items-center"
      onClick={() => handleSignOut()}
      disabled={isPending}
    >
      {isPending ? "Signing out..." : "Sign out"}
    </Button>
  );
};

export default SignOutButton;
