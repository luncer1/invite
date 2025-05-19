/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useCookie } from "./CookiesContext";

export const PLAYER_MAX_LIFES = 3;

const PLAYER = {
  id: 0,
  name: "Oliwia",
  score: 0,
  lives: 3,
  lost: false,
};

// 1. Relevant domain types
export type Player = {
  id: number;
  name: string;
  score: number;
  lives: number;
  lost: boolean;
};

// 2. Context types
type PlayerState = {
  player: Player;
  addScore(score: number): void;
  resetScore(): void;
  loseLife(): void;
  addLife(amountOfLives?: number): void;
  resetPlayer(): void;
};

// 3. Creating context
const PlayerContext = createContext<PlayerState | undefined>(undefined);

// 4. Hiding context by providing wanted API
type PlayerContextProps = PropsWithChildren<{
  initialPlayer?: Player;
}>;
export function PlayerContextProvider({ children }: PlayerContextProps) {
  const { setCookie, cookies } = useCookie();
  const [player, setPlayer] = useState<Player>(cookies.player || PLAYER);

  useEffect(() => {
    setCookie("player", player);
    if (player.lives == 0) {
      player.lost = true;
    }
  }, [player]);

  const resetPlayer = () => {
    setPlayer(PLAYER);
  };

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
      lives: prevPlayer.lives > 0 ? prevPlayer.lives - 1 : 0,
    }));
  };

  const addLife = (amountOfLives: number = 1) => {
    if (player.lives + amountOfLives > PLAYER_MAX_LIFES) {
      amountOfLives = PLAYER_MAX_LIFES - player.lives;
    }
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      lives: prevPlayer.lives + amountOfLives,
    }));
  };

  return (
    <PlayerContext.Provider
      value={{ player, addScore, resetScore, loseLife, resetPlayer, addLife }}
    >
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
