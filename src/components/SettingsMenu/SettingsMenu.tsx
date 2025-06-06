import { Difficulty, useGameState } from "../../contexts/GameStateContext";
import { usePlayer } from "../../contexts/PlayerContext";

const SettingsMenu = () => {
  const { getPlayerName, setPlayerName } = usePlayer();
  const { setDifficulty } = useGameState();

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
        <label htmlFor="SettingsMenu-playerName">Twoje imię</label>
        <input
          type="text"
          className="SettingsMenu-input"
          name="playerName"
          id="SettingsMenu-playerName"
          value={getPlayerName()}
          onChange={(e) => setPlayerName(e.target.value)}
        />
      </div>
      <div className="SettingsMenu-labeledInput">
        <label htmlFor="SettingsMenu-playerName">Poziom Trudności</label>

        <select
          name="SettingsMenu-difficulty"
          id="SettingsMenu-difficulty"
          onChange={(e) => setDifficulty(e.target.value as Difficulty)}
        >
          <option value={Difficulty.EASY}>
            {translateDifficulty(Difficulty.EASY)}
          </option>
          <option value={Difficulty.MEDIUM}>
            {translateDifficulty(Difficulty.MEDIUM)}
          </option>
          <option value={Difficulty.HARD}>
            {translateDifficulty(Difficulty.HARD)}
          </option>
        </select>
      </div>
    </div>
  );
};

export default SettingsMenu;
