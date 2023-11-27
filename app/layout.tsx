import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";

import { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { GameContextProvider } from "@/components/game-context-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wordle Clone",
  description: "A simple word guessing game",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={cn(poppins.className, "flex flex-col min-h-screen")}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <GameContextProvider>
              <ThemeToggle className="self-end m-4" />
              {children}
            </GameContextProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
