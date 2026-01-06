import { useNavigate } from "react-router-dom";
import { useGameState } from "../contexts/GameStateContext";
import WinnerPage from "../components/WinnerPage/WinnerPage";

const Winner = () => {
  const { getGameState } = useGameState();
  const navigate = useNavigate();

  const gameState = getGameState();
  const levels = gameState.levels;

  const isAllCompleted = levels.every((level) => level.done);
  if (!isAllCompleted) {
    navigate("/");
    return null;
  }

  return <WinnerPage />;
};

export default Winner;
