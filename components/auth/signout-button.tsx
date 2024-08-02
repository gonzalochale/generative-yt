"use client";

import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { signOutAction } from "@/actions/user";

const SignOutButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      const { errorMessage, url } = await signOutAction();
      if (errorMessage) {
        toast.error("Failed to sign out");
      }
      toast.success("Signed out successfully");
    });
  };

  return (
    <Button
      size="sm"
      variant="destructive"
      className="w-full"
      onClick={() => handleSignOut()}
      disabled={isPending}
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
