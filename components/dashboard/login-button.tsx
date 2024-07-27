"use client";

import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Provider } from "@supabase/supabase-js";
import { loginAction } from "@/actions/user";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
      className="flex gap-1 items-center"
      onClick={() => handleLogIn("google")}
      disabled={isPending}
    >
      {isPending ? (
        "Logging in..."
      ) : (
        <>
          Log in{" "}
          <svg
            viewBox="0 0 256 180"
            width="256"
            height="180"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid"
            className="w-6 h-6"
          >
            <path
              d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134Z"
              fill="red"
            />
            <path
              fill="#FFF"
              d="m102.421 128.06 66.328-38.418-66.328-38.418z"
            />
          </svg>
        </>
      )}
    </Button>
  );
};

export default LoginButton;
