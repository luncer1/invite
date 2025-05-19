import { PLAYER_MAX_LIFES, usePlayer } from "../../contexts/PlayerContext";
import BeatingHeart from "../BeatingHeart/BeatingHeart";
import "./PlayerHearths.css";
const PlayerHearths = () => {
  const { player } = usePlayer();
  return (
    <div className="PlayerHearths-container">
      <div className="PlayerHearths-box">
        <div className="PlayerHearths-hearts">
          {Array.from({ length: player.lives }, (_, index) => (
            <BeatingHeart key={index} active={true} />
          ))}
          {Array.from(
            { length: PLAYER_MAX_LIFES - player.lives },
            (_, index) => (
              <BeatingHeart key={index + player.lives} active={false} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerHearths;
