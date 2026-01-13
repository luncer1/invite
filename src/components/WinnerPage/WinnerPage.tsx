import { useNavigate } from "react-router-dom";
import { useGameState } from "../../contexts/GameStateContext";
import { usePlayer } from "../../contexts/PlayerContext";
import { formatTime } from "../../helpers/time";
import DeclineButton from "../DeclineButton/DeclineButton";
import "./WinnerPage.css";
import { Difficulty } from "../../helpers/constants";

const WinnerPage = () => {
  const { getGameState, resetGameState } = useGameState();
  const player = usePlayer();
  const navigate = useNavigate();

  const gameState = getGameState();
  const levels = gameState.levels;
  const totalScore = levels.reduce((acc, l) => acc + (l.score || 0), 0);

  const handleBackToMenu = () => {
    navigate("/invite");
  };

  const handlePlayAgain = () => {
    resetGameState();
    navigate("/invite/game");
  };

  return (
    <div className="Winner-container">
      <div className="Winner-card">
        <h1 className="Winner-title">Gratulacje! Wygrałaś 🎉</h1>

        <div className="Winner-summary">
          <div className="Winner-scoreBox">
            <div className="Winner-scoreLabel">Twój wynik</div>
            <div className="Winner-scoreValue">{totalScore}</div>
            <div className="Winner-playerName">{player.getPlayerName()}</div>
          </div>

          <div className="Winner-levels">
            <h3>Podsumowanie zadań</h3>
            <ul>
              {levels.map((l) => (
                <li key={l.id} className="Winner-levelItem">
                  <div className="Winner-levelName">{l.name}</div>
                  <div className="Winner-levelMeta">
                    <span className="Winner-levelPoints">
                      Punkty: {l.score}
                    </span>
                    <span className="Winner-levelTime">
                      Czas: {formatTime(l.time || 0)}
                    </span>
                    <span
                      className={
                        "Winner-levelDone " + (l.done ? "done" : "notdone")
                      }
                    >
                      {l.done ? "Wykonane" : "Niewykonane"}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="Winner-infoBox">
          <h4>Informacje</h4>
          <p>
            Brawo kochanie! Udało Ci się ukończyć wszystkie zadania, a więc
            oficjalnie zapraszam Cię na walentynki 14.02.2026, do restauracji
            "Szalone Widelce",{" "}
            <a href="https://szalonewidelce.pl/">Tu możesz zobaczyć menu.</a>{" "}
            Mamy rezerwacje na godzinę 19:00. Kocham Cię bardzo i nie mogę się
            doczekać naszego wspólnego wieczoru! ❤️
            {gameState.difficulty != Difficulty.HARD &&
              " P.S. Spróbuj przejść na trudniejszych poziomach!"}
          </p>
        </div>

        <div className="Winner-actions">
          <DeclineButton onClick={handleBackToMenu} label="Powrót do menu" />
          <button className="Winner-playAgain" onClick={handlePlayAgain}>
            Zagraj ponownie
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinnerPage;
