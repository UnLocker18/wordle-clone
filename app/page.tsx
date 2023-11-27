import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Lead, MainTitle } from "@/components/ui/typography";

export default function Home() {
  return (
    <main className="grow flex flex-col items-center gap-24 p-24">
      <div className="flex flex-col items-center gap-2" >
        <MainTitle>Wordle</MainTitle>
        <Lead>Can you guess the word?</Lead>
      </div>
      <Button size="lg">
        <Link href={"/play"} className="text-primary-foreground" >PLAY GAME</Link>
      </Button>
    </main>
  );
}
