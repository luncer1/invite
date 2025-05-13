import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { PlayerContextProvider } from "./contexts/PlayerContext";
import { CookiesContextProvider } from "./contexts/CookiesContext.tsx";
import { CookiesProvider } from "react-cookie";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PlayerContextProvider>
      <CookiesProvider>
        <CookiesContextProvider>
          <App />
        </CookiesContextProvider>
      </CookiesProvider>
    </PlayerContextProvider>
  </StrictMode>
);
