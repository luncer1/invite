import { usePlayer } from "../../contexts/PlayerContext";
import BeatingHeart from "../BeatingHeart/BeatingHeart";
import "./PlayerHearths.css";
const PlayerHearths = () => {
  const { getPlayerLives, getPlayerMaxLives } = usePlayer();
  return (
    <div className="PlayerHearths-container">
      <div className="PlayerHearths-box">
        <div className="PlayerHearths-hearts">
          {Array.from({ length: getPlayerLives() }, (_, index) => (
            <BeatingHeart key={index} active={true} />
          ))}
          {Array.from(
            { length: getPlayerMaxLives() - getPlayerLives() },
            (_, index) => (
              <BeatingHeart key={index + getPlayerLives()} active={false} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerHearths;
