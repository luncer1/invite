/* eslint-disable react-refresh/only-export-components */
import { createContext, PropsWithChildren, useContext, useState } from "react";

const PLAYER = {
  id: 0,
  name: "Oliwia",
  score: 0,
  lives: 3,
};

// 1. Relevant domain types
export type Player = {
  id: number;
  name: string;
  score: number;
  lives: number;
};

// 2. Context types
type PlayerState = {
  player: Player;
  addScore(score: number): void;
  resetScore(): void;
  loseLife(): void;
};

// 3. Creating context
const PlayerContext = createContext<PlayerState | undefined>(undefined);

// 4. Hiding context by providing wanted API
type PlayerContextProps = PropsWithChildren<{
  initialPlayer?: Player;
}>;
export function PlayerContextProvider({
  children,
  initialPlayer,
}: PlayerContextProps) {
  const [player, setPlayer] = useState<Player>(initialPlayer || PLAYER);

  const addScore = (score: number) => {
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      score: prevPlayer.score + score,
    }));
  };

  const resetScore = () => {
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      score: 0,
    }));
  };

  const loseLife = () => {
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      lives: prevPlayer.lives - 1,
    }));
  };

  return (
    <PlayerContext.Provider value={{ player, addScore, resetScore, loseLife }}>
      {children}
    </PlayerContext.Provider>
  );
}

// 5. Exporting context accessor
export function usePlayer(): PlayerState {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayers must be used within a PlayerContextProvider");
  }
  return context;
}
