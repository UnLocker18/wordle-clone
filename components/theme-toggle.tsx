"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Button, ButtonProps } from "@/components/ui/button";

import { Icons } from "./icons";

export function ThemeToggle({ ...props }: ButtonProps) {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      {...props}
    >
      <Icons.sun className="h-[1.5rem] w-[1.3rem] dark:hidden" />
      <Icons.moon className="hidden h-5 w-5 dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
