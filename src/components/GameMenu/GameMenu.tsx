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

  const handleContinueGame = () => {
    navigate("/game");
  };

  return (
    <div className="GameMenu-container">
      <h1 className="GameMenu-title">No cześć Kochana Oliwciu</h1>
      <p className="GameMenu-description">
        To juz drugie walentyki! Więc i giereczka troszkę lepsza, a tym razem
        zeby nie było tak łatwo to adres poznasz dopiero jak wykonasz wszystkie
        zadania z listy! Krótko o gierce:
        <ul>
          <li>
            Po kliknięciu Rozpocznij Nową Grę, zobaczysz listę zadań do
            wykonania.
          </li>
          <li>
            Możesz klikać w nie w dowolnej kolejności, po kliknięciu na zadanie
            zostaniesz do niego przeniesiona i tam będzie dokładny opis co
            robić.
          </li>
          <li>
            W lewym górnym rogu zobaczysz serduszka symbolizujące Twoje życie. W
            zależności od zadania tracisz je za upływający czas lub pomyłki.{" "}
          </li>
          <li>
            Ale nic się nie przejmuj jak serduszka się skończą, nie tracisz
            postępu tylko musisz zacząć dane zadanie od nowa.
          </li>
          <li>
            Po kliknięciu w ustawienia możesz ustawić sobie poziom trudności.
            Polecam trudny :)
          </li>
          <li>
            Gdy wykonasz wszystkie zadania z listy, pojawi się specjalny
            przycisk, który przekieruje Cię dalej,
          </li>
        </ul>
        Powodzenia! :)
      </p>
      <ul className="GameMenu-optionList">
        <li className="GameMenu-option" onClick={handleNewGame}>
          Rozpocznij Nową Grę
        </li>
        {anyProgressDone && (
          <li className="GameMenu-option" onClick={handleContinueGame}>
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
