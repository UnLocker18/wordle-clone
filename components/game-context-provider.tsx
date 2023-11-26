"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { useRequest } from "ahooks";

import gameConfig from "@/app/game-config";
import { getRandomWord } from "@/lib/utils";

interface GameData {
  correctWord: string;
  playerWord: string;
  attempts: number;
  error?: Error | undefined;
  loading?: boolean;
}

const GameContext = createContext<GameData>({
  correctWord: "",
  playerWord: "",
  attempts: 0,
});
const GameSetContext = createContext<(gameData: GameData) => void>(() => {});

export function useGameData() {
  return useContext(GameContext);
}

export function useSetGameData() {
  return useContext(GameSetContext);
}

export function GameContextProvider({ children }: { children: ReactNode }) {
  const [gameData, setGameData] = useState<GameData>({
    correctWord: "",
    playerWord: "",
    attempts: 0,
  });

  useRequest(() => getRandomWord(gameConfig.wordLength), {
    onBefore: () => setGameData({ ...gameData, loading: true }),
    onSuccess: (data) =>
      setGameData({
        ...gameData,
        loading: false,
        correctWord: data.toUpperCase(),
      }),
    onError: (error) => setGameData({ ...gameData, loading: false, error }),
  });

  return (
    <GameContext.Provider value={gameData}>
      <GameSetContext.Provider value={setGameData}>
        {children}
      </GameSetContext.Provider>
    </GameContext.Provider>
  );
}
