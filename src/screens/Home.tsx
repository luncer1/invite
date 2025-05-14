import { usePlayer } from "../contexts/PlayerContext";
import { useGameState } from "../contexts/GameStateContext";

const Home = () => {
  const { player, loseLife } = usePlayer();
  const { resetGameState } = useGameState();
  return (
    <div>
      <div>{player.lives}</div>
      <button onClick={loseLife}>Lose life</button>
      <button onClick={resetGameState}>Reset</button>
    </div>
  );
};

export default Home;
