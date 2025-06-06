import React, { useState, useEffect, useMemo } from "react";
import "./HeartPieces.css";
import { useGameState } from "../../contexts/GameStateContext";
import { Levels } from "../../helpers/constants";
import { usePlayer } from "../../contexts/PlayerContext";
import ConfirmationAlert from "../ConfirmationAlert/ConfirmationAlert";
import DeclineButton from "../DeclineButton/DeclineButton";
import { formatTime } from "../../helpers/time";
interface HeartPiecesProps {
  image: string;
  pieces: number; // e.g. 9 for 3x3, 16 for 4x4, etc.
  size?: number; // px, optional, default 400
  onSolved?: () => void;
}

type Piece = {
  idx: number; // original index
  x: number;
  y: number;
};

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const HeartPieces: React.FC<HeartPiecesProps> = ({
  image,
  pieces,
  size = 400,
  onSolved,
}) => {
  const grid = Math.sqrt(pieces);
  const [time, setTime] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const { passLevel, getGameState } = useGameState();
  const currentLevel = getGameState().levels[Levels.HEART_PIECES];
  const {
    getPlayerScoreMultiplier,
    resetLives,
    addScore,
    didPlayerLose,
    loseLife,
  } = usePlayer();
  if (!Number.isInteger(grid)) {
    throw new Error("Number of pieces must be a perfect square 8, 9, 16, etc.");
  }

  const resetLevel = () => {
    setTime(0);
    setTiles(shuffle(initialPieces));
    resetLives();
    setShowAlert(false);
  };

  const calculatePoints = () => {
    return Math.ceil((getPlayerScoreMultiplier() / (time || 1)) * 1000); // Avoid division by zero
  };

  useEffect(() => {
    const timer_interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => clearInterval(timer_interval);
  }, []);

  useEffect(() => {
    console.log(`Time: ${time}s`);
    if (time != 0 && time % 30 === 0) {
      loseLife();
    }
    if (didPlayerLose()) {
      setShowAlert(true);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  // Memoize initial pieces so it's only recalculated when pieces/grid changes
  const initialPieces = useMemo(() => {
    const arr: Piece[] = [];
    for (let y = 0; y < grid; y++) {
      for (let x = 0; x < grid; x++) {
        arr.push({ idx: y * grid + x, x, y });
      }
    }
    return arr;
  }, [grid]);

  // Reset tiles when pieces or image changes
  const [tiles, setTiles] = useState<Piece[]>(() => shuffle(initialPieces));
  useEffect(() => {
    setTiles(shuffle(initialPieces));
  }, [initialPieces, image]);

  const [selected, setSelected] = useState<number | null>(null);

  // Helper to check if two indices are adjacent in the grid
  const areAdjacent = (i: number, j: number) => {
    const xi = i % grid;
    const yi = Math.floor(i / grid);
    const xj = j % grid;
    const yj = Math.floor(j / grid);
    return (
      (xi === xj && Math.abs(yi - yj) === 1) ||
      (yi === yj && Math.abs(xi - xj) === 1)
    );
  };

  // Check if solved
  useEffect(() => {
    const solved = tiles.every((piece, i) => piece.idx === i);

    if (solved) {
      passLevel(Levels.HEART_PIECES, calculatePoints(), time);
      addScore(calculatePoints());
      resetLives();
      if (onSolved) {
        onSolved();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tiles, onSolved]);

  // Swap logic (only allow swap if adjacent)
  const handleTileClick = (i: number) => {
    if (selected === null) {
      setSelected(i);
    } else if (selected === i) {
      setSelected(null);
    } else if (areAdjacent(selected, i)) {
      // Swap tiles if adjacent
      const newTiles = [...tiles];
      [newTiles[selected], newTiles[i]] = [newTiles[i], newTiles[selected]];
      setTiles(newTiles);
      setSelected(null);
    } else {
      // Not adjacent, just select new
      setSelected(i);
    }
  };

  const tileSize = size / grid;

  return (
    <div className="HeartPieces-container">
      <div className="HeartPieces-timer">
        Czas: {didPlayerLose() ? 0 : formatTime(time)}
      </div>
      <div className="HeartPieces-description">
        <p>{currentLevel.description}</p>
      </div>
      <div
        className="HeartPieces-board"
        style={{
          width: size,
          height: size,
          display: "grid",
          gridTemplateColumns: `repeat(${grid}, 1fr)`,
          gridTemplateRows: `repeat(${grid}, 1fr)`,
          gap: 2,
        }}
      >
        {tiles.map((piece, i) => {
          const origX = piece.idx % grid;
          const origY = Math.floor(piece.idx / grid);
          return (
            <div
              key={i}
              onClick={() => handleTileClick(i)}
              className={
                "HeartPieces-tile" + (selected === i ? " selected" : "")
              }
              style={{
                width: tileSize,
                height: tileSize,
                backgroundImage: `url(${image})`,
                backgroundSize: `${size}px ${size}px`,
                backgroundPosition: `-${origX * tileSize}px -${
                  origY * tileSize
                }px`,
              }}
              aria-label={`Puzzle piece ${i + 1}`}
            />
          );
        })}
      </div>
      <div className="HeartPieces-controls">
        <DeclineButton
          onClick={() => {
            if (onSolved) {
              onSolved();
            }
            resetLives();
          }}
          label="Lista zadań"
        />
      </div>
      <ConfirmationAlert
        show={showAlert}
        message="Przegrałaś czy chcesz spróbować ponownie?"
        onCancel={() => {
          if (onSolved) {
            resetLives();
            onSolved();
          }
        }}
        onConfirm={resetLevel}
      />
    </div>
  );
};

export default HeartPieces;
