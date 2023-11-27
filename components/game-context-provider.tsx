"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { useRequest } from "ahooks";

import { getRandomWord } from "@/lib/utils";
import gameConfig from "@/app/game-config";

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
const GameSetContext = createContext<Dispatch<SetStateAction<GameData>>>(
  () => {}
);

export function useGameData() {
  return useContext(GameContext);
}

export function useSetGameData() {
  return useContext(GameSetContext);
}

export function initGameData() {
  const setGameData = useSetGameData();

  useRequest(() => getRandomWord(gameConfig.wordLength), {
    onBefore: () =>
      setGameData((gameData: GameData) => {
        return { ...gameData, loading: true };
      }),
    onSuccess: (data) => {
      setGameData((gameData: GameData) => {
        return {
          ...gameData,
          loading: false,
          correctWord: data.toUpperCase(),
        };
      });
      console.warn(`The correct word is ${data.toUpperCase()}`);
    },
    onError: (error) =>
      setGameData((gameData: GameData) => {
        return { ...gameData, loading: false, error };
      }),
  });
}

export function GameContextProvider({ children }: { children: ReactNode }) {
  const [gameData, setGameData] = useState<GameData>({
    correctWord: "",
    playerWord: "",
    attempts: 0,
  });

  return (
    <GameContext.Provider value={gameData}>
      <GameSetContext.Provider value={setGameData}>
        {children}
      </GameSetContext.Provider>
    </GameContext.Provider>
  );
}
