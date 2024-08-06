"use client";

import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Provider } from "@supabase/supabase-js";
import { loginAction } from "@/actions/user";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { IconYouTube } from "../ui/icons";

const LoginButton = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogIn = (provider: Provider) => {
    startTransition(async () => {
      const { errorMessage, url } = await loginAction(provider);
      if (!errorMessage && url) {
        router.push(url);
      } else {
        toast.error(errorMessage);
      }
    });
  };

  return (
    <Button
      size="sm"
      variant="outline"
      className="flex gap-2 items-center"
      onClick={() => handleLogIn("google")}
      disabled={isPending}
    >
      {isPending ? (
        "Logging in..."
      ) : (
        <>
          Enter with Google
          <IconYouTube />
        </>
      )}
    </Button>
  );
};

export default LoginButton;
