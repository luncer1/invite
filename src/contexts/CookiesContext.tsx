/* eslint-disable react-refresh/only-export-components */
import { createContext, PropsWithChildren, useContext } from "react";
import { useCookies } from "react-cookie";
import { Player } from "./PlayerContext";
import { GameState } from "./GameStateContext";

type CookiesState = {
  setCookie: (name: "player" | "gameState", value: Player | GameState) => void;
  cookies: {
    player?: Player;
    gameState?: null;
  };
};

const CookiesContext = createContext<CookiesState | undefined>(undefined);

type CookiesContextProps = PropsWithChildren;

export const CookiesContextProvider = ({ children }: CookiesContextProps) => {
  const [cookies, setCookies] = useCookies(["player", "gameState"]);
  const setCookie = (
    name: "player" | "gameState",
    value: Player | GameState
  ) => {
    setCookies(name, value);
  };

  return (
    <CookiesContext.Provider value={{ setCookie, cookies }}>
      {children}
    </CookiesContext.Provider>
  );
};
export const useCookie = (): CookiesState => {
  const context = useContext(CookiesContext);
  if (context === undefined) {
    throw new Error("useCookiesContext must be used within a CookiesProvider");
  }
  return context;
};
