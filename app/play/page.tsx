"use client";

import { Fragment, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useKeyPress } from "ahooks";

import { cn, lowercaseLetters } from "@/lib/utils";
import { Loader } from "@/components/ui/loader";
import { H1 } from "@/components/ui/typography";
import {
  initGameData,
  useGameData,
  useSetGameData,
} from "@/components/game-context-provider";
import ScreenKeyboard from "@/components/screen-keyboard";

import gameConfig from "../game-config";

const physicalKeysToHandle = [...lowercaseLetters, "Backspace", "Enter"];

const keyMapping = (key: string) => {
  switch (key) {
    case "Backspace":
      return "{bksp}";
    case "Enter":
      return "{enter}";
    default:
      return key.toUpperCase();
  }
};

export default function Play() {
  const router = useRouter();
  const keyboard = useRef(null);

  initGameData();
  const { correctWord, error, loading } = useGameData();
  const setGameData = useSetGameData();

  const [input, setInput] = useState("");
  const [words, setWords] = useState<(string | null)[]>(
    Array.from({ length: gameConfig.maxAttempts }, () => null)
  );
  const activeIndex = words.findIndex((w) => w === null);

  useKeyPress(physicalKeysToHandle, (event) =>
    onKeyPress(keyMapping(event.key))
  );

  const onKeyPress = (button: string) => {
    switch (button) {
      case "{enter}":
        if (input.length === correctWord.length) {
          setWords(words.map((w, i) => (i === activeIndex ? input : w)));
          setInput("");

          if (input === correctWord || activeIndex === words.length - 1) {
            setGameData({
              correctWord: correctWord,
              playerWord: input,
              attempts: activeIndex + 1,
            });
            router.push("/end");
          }
        }
        break;
      case "{bksp}":
        setInput(input.slice(0, -1));
        break;
      default:
        if (button.match(/^[A-Z]/) && input.length < correctWord.length)
          setInput(input + button);
    }
  };

  return (
    <main className="grow flex flex-col items-center justify-between px-4 py-8 md:px-16">
      {loading ? (
        <Loader />
      ) : error ? (
        <div>ERROR - RETRY</div>
      ) : (
        <>
          <WordsBoard {...{ words, correctWord, input, activeIndex }} />
          <ScreenKeyboard keyboardRef={keyboard} onKeyPress={onKeyPress} />
        </>
      )}
    </main>
  );
}

function WordsBoard({
  words,
  correctWord,
  input,
  activeIndex,
}: {
  words: (string | null)[];
  correctWord: string;
  input: string;
  activeIndex: number;
}) {
  const emptyWord = "-".repeat(correctWord.length);
  input = input.concat("-".repeat(correctWord.length - input.length));

  const LetterBlocks = ({
    word,
    showHints = false,
  }: {
    word: string;
    showHints?: boolean;
  }) => (
    <div className="flex gap-2">
      {word.split("").map((letter, i) => (
        <LetterBlock
          key={i}
          {...{
            letter,
            correctWord,
            letterIndex: i,
            showHints,
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-2">
      {words.map((word, index) => (
        <LetterBlocks
          key={index}
          word={index === activeIndex ? input : word || emptyWord}
          showHints={index !== activeIndex && word !== null}
        />
      ))}
    </div>
  );
}

function LetterBlock({
  letter,
  correctWord,
  letterIndex,
  showHints,
}: {
  letter: string;
  correctWord: string;
  letterIndex: number;
  showHints: boolean;
}) {
  let hintsClassName = "";
  if (correctWord[letterIndex] === letter) {
    hintsClassName = "bg-success";
  } else if (correctWord.includes(letter)) {
    hintsClassName = "bg-warning";
  } else {
    hintsClassName = "bg-neutral";
  }
  return (
    <div
      key={letterIndex}
      className={cn(
        "flex items-center justify-center w-12 h-12 bg-card border-2 border-border rounded-sm",
        showHints && hintsClassName
      )}
    >
      <H1 className="font-semibold">{letter !== "-" ? letter : ""}</H1>
    </div>
  );
}
