"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { H1, Lead } from "@/components/ui/typography";
import { useGameData } from "@/components/game-context-provider";

import gameConfig from "../game-config";

export default function End() {
  const { correctWord, playerWord, attempts } = useGameData();

  return (
    <main className="grow flex flex-col items-center gap-24 p-24 text-center">
      {correctWord === playerWord ? (
        <div className="flex flex-col items-center gap-2">
          <H1 className="font-bold">Congratulations! You guessed correctly!</H1>
          <Lead>
            You scored{" "}
            <span className="text-primary">
              {11000 - (attempts / gameConfig.maxAttempts) * 5000}
            </span>{" "}
            points
          </Lead>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <H1>Unfortunately that wasn't correct.</H1>
          <Lead>Retry to prove your worth!</Lead>
        </div>
      )}
      <Button size="lg">
        <Link href="/play">PLAY AGAIN</Link>
      </Button>
    </main>
  );
}
