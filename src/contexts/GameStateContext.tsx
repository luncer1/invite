/* eslint-disable react-hooks/exhaustive-deps */

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useCookie } from "./CookiesContext";
import { usePlayer } from "./PlayerContext";
import { Difficulty, INITIAL_GAME_STATE } from "../helpers/constants";

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
  getGameState: () => GameState;
  resetGameState: () => void;
  getDifficulty: () => Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
  anyProgressDone: boolean;
  passLevel: (levelId: number, score: number, time: number) => void;
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
    setGameState((prevState) => ({
      ...prevState,
      levels: INITIAL_GAME_STATE.levels,
    }));
    resetPlayer();
  };

  const anyProgressDone = gameState.levels.some((level) => level.done);

  const getGameState = (): GameState => {
    return gameState;
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

  const passLevel = (levelId: number, score: number, time: number) => {
    setGameState((prevState) => {
      const updatedLevels = prevState.levels.map((level) => {
        if (level.id === levelId) {
          return {
            ...level,
            done: true,
            score: level.score + score,
            time: level.time + time,
          };
        }
        return level;
      });
      return {
        ...prevState,
        levels: updatedLevels,
      };
    });
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
      value={{
        getGameState,
        resetGameState,
        getDifficulty,
        setDifficulty,
        anyProgressDone,
        passLevel,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export function useGameState(): GameStateState {
  const context = useContext(GameStateContext);
  if (context === undefined) {
    throw new Error("useGameState must be used within a GameStateContext");
  }
  return context;
}
