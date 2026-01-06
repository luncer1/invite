// src/AppRouter.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import "./Router.css";
import GameTitle from "./components/GameTitle/GameTitle";
import Settings from "./screens/Settings";
import Game from "./screens/Game";
import Winner from "./screens/Winner";

export default function AppRouter() {
  return (
    <div className="Router-AppContainer">
      <BrowserRouter>
        <GameTitle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/game" element={<Game />} />
          <Route path="/winner" element={<Winner />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
