import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { nanoid } from "@/lib/utils";
import { AI } from "@/lib/chat/actions";
import PlausibleProvider from "next-plausible";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "GenerativeYT - Generative UI Chat to improve your YouTuvbe channel",
  description:
    "GenerativeYT is a generative UI chat that helps you improve your YouTube channel, by providing you with insights and tips on how to grow your channel, analitycs, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const id = nanoid();
  const domain = process.env.NEXT_PUBLIC_DOMAIN as string;
  const customDomain = process.env
    .NEXT_PUBLIC_PLAUSIBLE_CUSTOM_DOMAIN as string;
  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <html lang="en">
        <head>
          <PlausibleProvider domain={domain} customDomain={customDomain} />
        </head>
        <body
          className={cn(
            "min-h-screen bg-background antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster position="bottom-right" />
          </ThemeProvider>
        </body>
      </html>
    </AI>
  );
}
