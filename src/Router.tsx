// src/AppRouter.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import "./Router.css";
import GameTitle from "./components/GameTitle/GameTitle";

export default function AppRouter() {
  return (
    <div className="Router-AppContainer">
      <BrowserRouter>
        <GameTitle />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
