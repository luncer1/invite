import { useNavigate } from "react-router-dom";
import {
  INITIAL_GAME_STATE,
  useGameState,
} from "../../contexts/GameStateContext";
import "./GameMenu.css";
const GameMenu = () => {
  const { gameState } = useGameState();
  const navigate = useNavigate();
  return (
    <div className="GameMenu-container">
      <h1 className="GameMenu-title">No cześć Kochana Oliwciu</h1>
      <p className="GameMenu-description">
        To juz drugie walentyki! Więc i giereczka troszkę lepsza, a tym razem
        zeby nie było tak łatwo to adres poznasz dopiero jak wykonasz wszystkie
        zadania z listy!
      </p>
      <ul className="GameMenu-optionList">
        <li className="GameMenu-option" onClick={() => console.log("Nowa Gra")}>
          Rozpocznij Nową Grę
        </li>
        {gameState != INITIAL_GAME_STATE && (
          <li
            className="GameMenu-option"
            onClick={() => console.log("Kontynuuj gre")}
          >
            Kontynuuj Grę
          </li>
        )}

        <li className="GameMenu-option" onClick={() => navigate("/settings")}>
          Ustawienia
        </li>
      </ul>
    </div>
  );
};

export default GameMenu;
