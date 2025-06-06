import { useGameState } from "../../contexts/GameStateContext";
import "./TaskList.css";
import DeclineButton from "../DeclineButton/DeclineButton";
import { useNavigate } from "react-router-dom";
import { formatTime } from "../../helpers/time";

interface TaskListProps {
  switchLevel: (level: number) => void;
}

const TaskList = ({ switchLevel }: TaskListProps) => {
  const { getGameState } = useGameState();
  const navigate = useNavigate();
  const levels = getGameState().levels;

  return (
    <div className="TaskList-container">
      <h2>Lista Zadań</h2>
      <ul className="TaskList-list">
        {levels.map((level) => (
          <li key={level.id} className="TaskList-item">
            <label className="TaskList-checkboxLabel">
              <input
                type="checkbox"
                checked={level.done}
                readOnly
                disabled
                className="TaskList-checkbox"
              />
              <span
                className="TaskList-levelName"
                onClick={() => {
                  if (!level.done) switchLevel(level.id);
                }}
              >
                {level.name}
              </span>
            </label>
            <span className="TaskList-score">Punkty: {level.score}</span>
            <span className="TaskList-time">
              Czas: {formatTime(level.time)}
            </span>
          </li>
        ))}
      </ul>
      <div className="TaskList-footer">
        <DeclineButton label="Menu" onClick={() => navigate("/")} />
      </div>
    </div>
  );
};

export default TaskList;
