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
import { usePlayer } from "./PlayerContext";

export enum Difficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

export const INITIAL_GAME_STATE = {
  difficulty: Difficulty.EASY,
  levels: [
    {
      id: 0,
      name: "Level 1",
      description: "Description of level 1",
      image: "image1.png",
      score: 0,
      done: false,
      time: 0,
    },
    {
      id: 1,
      name: "Level 2",
      description: "Description of level 2",
      image: "image2.png",
      score: 0,
      done: false,
      time: 0,
    },
    {
      id: 2,
      name: "Level 3",
      description: "Description of level 3",
      image: "image3.png",
      score: 0,
      done: false,
      time: 0,
    },
    {
      id: 3,
      name: "Level 4",
      description: "Description of level 4",
      image: "image4.png",
      score: 0,
      done: false,
      time: 0,
    },
    {
      id: 4,
      name: "Level 5",
      description: "Description of level 5",
      image: "image5.png",
      score: 0,
      done: false,
      time: 0,
    },
  ],
};

type Level = {
  id: number;
  name: string;
  description: string;
  image: string;
  score: number;
  done: boolean;
  time: number;
};

export type GameState = {
  levels: Array<Level>;
  difficulty: Difficulty;
};

type GameStateState = {
  gameState: GameState;
  resetGameState: () => void;
  getDifficulty: () => Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
};

const GameStateContext = createContext<GameStateState | undefined>(undefined);

type GameStateContextProps = PropsWithChildren;

export function GameStateContextProvider({ children }: GameStateContextProps) {
  const { setCookie, cookies } = useCookie();
  const { resetPlayer, setPlayerMaxLives, setPlayerScoreMultiplier } =
    usePlayer();
  const [gameState, setGameState] = useState<GameState>(
    cookies.gameState || INITIAL_GAME_STATE
  );

  useEffect(() => {
    setCookie("gameState", gameState);
  }, [gameState]);

  const resetGameState = () => {
    setGameState(INITIAL_GAME_STATE);
    resetPlayer();
  };

  const setDifficulty = (difficulty: Difficulty) => {
    setGameState((prevState) => ({
      ...prevState,
      difficulty,
    }));
  };
  const getDifficulty = (): Difficulty => {
    return gameState.difficulty;
  };

  useEffect(() => {
    switch (gameState.difficulty) {
      case Difficulty.EASY:
        setPlayerMaxLives(10);
        setPlayerScoreMultiplier(1);
        break;
      case Difficulty.MEDIUM:
        setPlayerMaxLives(5);
        setPlayerScoreMultiplier(3);
        break;
      case Difficulty.HARD:
        setPlayerMaxLives(3);
        setPlayerScoreMultiplier(10);
        break;
      default:
        setDifficulty(Difficulty.EASY);
    }
  }, [gameState.difficulty]);

  return (
    <GameStateContext.Provider
      value={{ gameState, resetGameState, getDifficulty, setDifficulty }}
    >
      {children}
    </GameStateContext.Provider>
  );
}
export function useGameState(): GameStateState {
  const context = useContext(GameStateContext);
  if (context === undefined) {
    throw new Error("useGameState must be used within a GameStateContext");
  }
  return context;
}
