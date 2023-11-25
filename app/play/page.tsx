"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useKeyPress } from "ahooks";

import {
  useGameData,
  useSetGameData,
} from "@/components/game-context-provider";
import ScreenKeyboard from "@/components/screen-keyboard";
import gameConfig from "../game-config";

const lowercaseLetters = (() => {
  const caps = [...Array(26)].map((val, i) => String.fromCharCode(i + 65));
  return caps.map((letter) => letter.toLowerCase());
})();

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

  const { correctWord } = useGameData();
  const setGameData = useSetGameData();

  const [input, setInput] = useState("");
  const [words, setWords] = useState<(string | null)[]>(Array.from({length: gameConfig.maxAttempts}, () => null));
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <WordsBoard {...{ words, correctWord, input, activeIndex }} />
      <ScreenKeyboard keyboardRef={keyboard} onKeyPress={onKeyPress} />
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
  return words.map((word, index) =>
    index === activeIndex ? (
      <div key={index}>{input}</div>
    ) : (
      <div key={index}>
        {word
          ? word.split("").map((letter, i) => {
              let className = "";
              if (correctWord[i] === letter) {
                className = "bg-green-300";
              } else if (correctWord.includes(letter)) {
                className = "bg-yellow-300";
              } else {
                className = "bg-slate-300";
              }
              return (
                <span key={i} {...{ className }}>
                  {letter}
                </span>
              );
            })
          : ""}
      </div>
    )
  );
}
