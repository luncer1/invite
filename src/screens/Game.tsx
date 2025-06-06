import { useState } from "react";
import TaskList from "../components/TaskList/TaskList";
import { Levels } from "../helpers/constants";
import PlayerHearths from "../components/PlayerHearths/PlayerHearths";
import HeartPieces from "../components/HeartPieces/HeartPieces";
import picture from "../assets/Heart_pieces_img.JPEG";

const Game = () => {
  const [currentLevel, setCurrentLevel] = useState(Levels.TASK_LIST);

  return (
    <div className="Game-container">
      <PlayerHearths />
      {(() => {
        switch (currentLevel) {
          case Levels.TASK_LIST:
            return <TaskList switchLevel={setCurrentLevel} />;
          case Levels.HEART_PIECES:
            return (
              <HeartPieces
                image={picture}
                pieces={16}
                onSolved={() => setCurrentLevel(Levels.TASK_LIST)}
              />
            );
          default:
            return <div>Unknown Level</div>;
        }
      })()}
    </div>
  );
};

export default Game;
