"use client";

import { useGameData } from "@/components/game-context-provider";
import Link from "next/link";

export default function End() {
  const { correctWord, playerWord, attempts } = useGameData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>{correctWord === playerWord ? "YOU WIN" : "YOU LOSE"}</div>
      <Link href={"/play"}>PLAY AGAIN</Link>
    </main>
  );
}
