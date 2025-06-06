import { useState } from "react";
import TaskList from "../components/TaskList/TaskList";
import { Levels } from "../helpers/constants";
import PlayerHearths from "../components/PlayerHearths/PlayerHearths";

const Game = () => {
  const [currentLevel, setCurrentLevel] = useState(Levels.TASK_LIST);

  return (
    <div className="Game-container">
      <PlayerHearths />
      {(() => {
        switch (currentLevel) {
          case Levels.TASK_LIST:
            return <TaskList switchLevel={setCurrentLevel} />;
          default:
            return <div>Unknown Level</div>;
        }
      })()}
    </div>
  );
};

export default Game;
