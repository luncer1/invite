import { useGameState } from "../../contexts/GameStateContext";
import { usePlayer } from "../../contexts/PlayerContext";
import "./SettingsMenu.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationAlert from "../ConfirmationAlert/ConfirmationAlert";
import AcceptButton from "../AcceptButton/AcceptButton";
import DeclineButton from "../DeclineButton/DeclineButton";
import { Difficulty } from "../../helpers/constants";

const SettingsMenu = () => {
  const { getPlayerName, setPlayerName } = usePlayer();
  const { getDifficulty, setDifficulty, anyProgressDone } = useGameState();
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    playerName: getPlayerName(),
    difficulty: getDifficulty(),
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleSave = () => {
    if (formData.playerName.trim() === "") {
      return;
    }
    if (formData.difficulty !== getDifficulty() && anyProgressDone) {
      setShowAlert(true);
      return;
    }
    setPlayerName(formData.playerName);
    setDifficulty(formData.difficulty);
    navigation("/");
  };

  const handleBack = () => {
    navigation("/");
  };

  const translateDifficulty = (difficulty: string) => {
    switch (difficulty) {
      case "EASY":
        return "Łatwy";
      case "MEDIUM":
        return "Średni";
      case "HARD":
        return "Trudny";
      default:
        return "Łatwy";
    }
  };

  return (
    <div className="SettingsMenu-container">
      <div className="SettingsMenu-title">Ustawienia</div>
      <div className="SettingsMenu-labeledInput">
        <label className="SettingsMenu-label" htmlFor="SettingsMenu-playerName">
          Twoje imię
        </label>
        <input
          type="text"
          className="SettingsMenu-input"
          name="playerName"
          id="SettingsMenu-playerName"
          value={formData.playerName}
          maxLength={20}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= 20) {
              setFormData({ ...formData, playerName: value });
            }
          }}
        />
        {formData.playerName.trim() === "" && (
          <div className="SettingsMenu-error">Imię nie może być puste.</div>
        )}
      </div>
      <div className="SettingsMenu-labeledInput">
        <label className="SettingsMenu-label" htmlFor="SettingsMenu-difficulty">
          Poziom Trudności
        </label>
        <select
          className="SettingsMenu-select"
          name="SettingsMenu-difficulty"
          id="SettingsMenu-difficulty"
          value={formData.difficulty}
          onChange={(e) =>
            setFormData({
              ...formData,
              difficulty: e.target.value as Difficulty,
            })
          }
        >
          <option className="SettingsMenu-option" value={Difficulty.EASY}>
            {translateDifficulty(Difficulty.EASY)}
          </option>
          <option className="SettingsMenu-option" value={Difficulty.MEDIUM}>
            {translateDifficulty(Difficulty.MEDIUM)}
          </option>
          <option className="SettingsMenu-option" value={Difficulty.HARD}>
            {translateDifficulty(Difficulty.HARD)}
          </option>
        </select>
      </div>
      <div className="SettingsMenu-difficultyInfo">
        <div>
          <strong>Łatwy:</strong> 10 serc, mnożnik punktów x1
        </div>
        <div>
          <strong>Średni:</strong> 5 serc, mnożnik punktów x3
        </div>
        <div>
          <strong>Trudny:</strong> 3 serca, mnożnik punktów x10
        </div>
      </div>
      <div className="SettingsMenu-buttons">
        <DeclineButton onClick={handleBack} label="Powrót" />
        <AcceptButton onClick={handleSave} label="Zapisz" />
      </div>
      <ConfirmationAlert
        show={showAlert}
        onCancel={() => setShowAlert(false)}
        onConfirm={() => {
          setDifficulty(formData.difficulty);
          setPlayerName(formData.playerName);
          setShowAlert(false);
          navigation("/");
        }}
        message="Zmiana poziomu trudności spowoduje reset obecnego postępu, czy chcesz kontynuować?"
      />
    </div>
  );
};

export default SettingsMenu;
