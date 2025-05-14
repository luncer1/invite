import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { PlayerContextProvider } from "./contexts/PlayerContext";
import { CookiesContextProvider } from "./contexts/CookiesContext.tsx";
import { CookiesProvider } from "react-cookie";
import { GameStateContextProvider } from "./contexts/GameStateContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CookiesProvider>
      <CookiesContextProvider>
        <PlayerContextProvider>
          <GameStateContextProvider>
            <App />
          </GameStateContextProvider>
        </PlayerContextProvider>
      </CookiesContextProvider>
    </CookiesProvider>
  </StrictMode>
);
