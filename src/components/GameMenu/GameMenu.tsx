import { useNavigate } from "react-router-dom";
import { useGameState } from "../../contexts/GameStateContext";
import "./GameMenu.css";
import ConfirmationAlert from "../ConfirmationAlert/ConfirmationAlert";
import { useState } from "react";
const GameMenu = () => {
  const { anyProgressDone, resetGameState } = useGameState();
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleNewGame = () => {
    if (anyProgressDone) {
      setShowAlert(true);
      return;
    }
    resetGameState();
    navigate("/game");
  };
  return (
    <div className="GameMenu-container">
      <h1 className="GameMenu-title">No cześć Kochana Oliwciu</h1>
      <p className="GameMenu-description">
        To juz drugie walentyki! Więc i giereczka troszkę lepsza, a tym razem
        zeby nie było tak łatwo to adres poznasz dopiero jak wykonasz wszystkie
        zadania z listy!
      </p>
      <ul className="GameMenu-optionList">
        <li className="GameMenu-option" onClick={handleNewGame}>
          Rozpocznij Nową Grę
        </li>
        {anyProgressDone && (
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
      <ConfirmationAlert
        show={showAlert}
        onConfirm={() => {
          resetGameState();
          navigate("/game");
          setShowAlert(false);
        }}
        onCancel={() => setShowAlert(false)}
        message={"Czy na pewno chcesz rozpocząć nową grę?"}
      />
    </div>
  );
};

export default GameMenu;
