"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface GameData {
  correctWord: string;
  playerWord: string;
  attempts: number;
}

const GameContext = createContext<GameData>({correctWord: "CIAOO", playerWord: "", attempts: 0});
const GameSetContext = createContext<
  ((gameData: GameData) => void)
>(() => {});

export function useGameData() {
  return useContext(GameContext);
}

export function useSetGameData() {
  return useContext(GameSetContext);
}

export function GameContextProvider({ children }: { children: ReactNode }) {
  const [gameData, setGameData] = useState<GameData>({correctWord: "CIAOO", playerWord: "", attempts: 0});
  return (
    <GameContext.Provider value={gameData}>
      <GameSetContext.Provider value={setGameData}>
        {children}
      </GameSetContext.Provider>
    </GameContext.Provider>
  );
}
