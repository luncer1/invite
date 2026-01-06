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

  const isGameCompleted = levels.every((level) => level.done);

  return (
    <div className="TaskList-container">
      <h2>Lista Zadań</h2>
      <ul className="TaskList-list">
        {levels.map((level) => (
          <li
            key={level.id}
            className="TaskList-item"
            onClick={() => {
              if (!level.done) switchLevel(level.id);
            }}
          >
            <label className="TaskList-checkboxLabel">
              <input
                type="checkbox"
                checked={level.done}
                readOnly
                onClick={() => {
                  if (!level.done) switchLevel(level.id);
                }}
                className="TaskList-checkbox"
              />
              <span className="TaskList-levelName">{level.name}</span>
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
        {isGameCompleted && (
          <DeclineButton
            label="Twoja Nagroda"
            onClick={() => navigate("/winner")}
          />
        )}
      </div>
    </div>
  );
};

export default TaskList;
