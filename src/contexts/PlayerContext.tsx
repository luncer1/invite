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

const PLAYER = {
  id: 0,
  name: "Oliwia",
  score: 0,
  lives: 3,
  lost: false,
  maxLives: 10,
  scoreMultiplier: 1,
};

// 1. Relevant domain types
export type Player = {
  id: number;
  name: string;
  score: number;
  lives: number;
  lost: boolean;
  maxLives: number;
  scoreMultiplier: number;
};

// 2. Context types
type PlayerState = {
  addScore(score: number): void;
  resetScore(): void;
  loseLife(): void;
  addLife(amountOfLives?: number): void;
  resetPlayer(): void;
  getPlayerName(): string;
  setPlayerName(name: string): void;
  getPlayerLives(): number;
  getPlayerMaxLives(): number;
  setPlayerMaxLives(maxLives: number): void;
  setPlayerScoreMultiplier(multiplier: number): void;
  getPlayerScoreMultiplier(): number;
  resetLives(): void;
  didPlayerLose(): boolean;
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
    resetScore();
    resetLives();
  };

  const getPlayerName = () => {
    return player.name;
  };

  const getPlayerLives = () => {
    return player.lives;
  };

  const getPlayerMaxLives = () => {
    return player.maxLives;
  };

  const didPlayerLose = () => {
    return player.lost;
  };

  const setPlayerMaxLives = (maxLives: number) => {
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      maxLives: maxLives,
      lives: maxLives,
    }));
  };

  const setPlayerName = (name: string) => {
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      name: name,
    }));
  };

  const addScore = (score: number) => {
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      score: prevPlayer.score + score * player.scoreMultiplier,
    }));
  };

  const resetLives = () => {
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      lives: prevPlayer.maxLives,
      lost: false,
    }));
  };

  const resetScore = () => {
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      score: 0,
    }));
  };

  const setPlayerScoreMultiplier = (multiplier: number) => {
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      scoreMultiplier: multiplier,
    }));
  };
  const getPlayerScoreMultiplier = () => {
    return player.scoreMultiplier;
  };

  const loseLife = () => {
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      lives: prevPlayer.lives > 0 ? prevPlayer.lives - 1 : 0,
    }));
  };

  const addLife = (amountOfLives: number = 1) => {
    if (player.lives + amountOfLives > player.maxLives) {
      amountOfLives = player.maxLives - player.lives;
    }
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      lives: prevPlayer.lives + amountOfLives,
    }));
  };

  return (
    <PlayerContext.Provider
      value={
        {
          addScore,
          resetScore,
          resetLives,
          loseLife,
          resetPlayer,
          addLife,
          getPlayerName,
          setPlayerName,
          getPlayerLives,
          getPlayerMaxLives,
          setPlayerMaxLives,
          setPlayerScoreMultiplier,
          getPlayerScoreMultiplier,
          didPlayerLose,
        } as PlayerState
      }
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
