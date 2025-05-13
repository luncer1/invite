/* eslint-disable react-refresh/only-export-components */
import { createContext, PropsWithChildren, useContext } from "react";
import { useCookies } from "react-cookie";
import { Player, usePlayer } from "./PlayerContext";

type CookiesState = {
  setCookie: () => void;
  cookies: {
    player?: Player;
    gameState?: null;
  };
};

const CookiesContext = createContext<CookiesState | undefined>(undefined);

type CookiesContextProps = PropsWithChildren;

export const CookiesContextProvider = ({ children }: CookiesContextProps) => {
  const { player } = usePlayer();
  const [cookies, setCookies] = useCookies(["player", "gameState"]);
  const setCookie = () => {
    setCookies("player", player);
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
