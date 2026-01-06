import React, { useEffect, useMemo, useState } from "react";
import "./LoversPairs.css";
import lovePairs1 from "../../assets/IMG_20250322_133322.JPEG";
import lovePairs2 from "../../assets/IMG_3354.JPEG";
import lovePairs3 from "../../assets/IMG_4687.JPEG";
import lovePairs4 from "../../assets/IMG_4951.JPEG";
import lovePairs5 from "../../assets/IMG_5604.JPEG";
import lovePairs6 from "../../assets/IMG_6195.JPEG";
import lovePairs7 from "../../assets/IMG_6496.JPEG";
import lovePairs8 from "../../assets/IMG_6527.JPEG";

import DeclineButton from "../DeclineButton/DeclineButton";
import { useGameState } from "../../contexts/GameStateContext";
import { Levels } from "../../helpers/constants";
import { usePlayer } from "../../contexts/PlayerContext";
import { formatTime } from "../../helpers/time";
import ConfirmationAlert from "../ConfirmationAlert/ConfirmationAlert";

type Tile = {
  id: number;
  pairId: number;
  image: string;
  revealed: boolean;
  matched: boolean;
};

type LoversPairsProps = {
  images?: string[];
  tilesCount?: number; // total number of tiles (must be even)
  onSolved?: () => void;
};

const DEFAULT_IMAGES = [
  lovePairs1,
  lovePairs2,
  lovePairs3,
  lovePairs4,
  lovePairs5,
  lovePairs6,
  lovePairs7,
  lovePairs8,
];

const shuffle = <T,>(array: T[]): T[] => {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const generateTiles = (images: string[], tilesCount: number): Tile[] => {
  // Ensure even
  if (tilesCount % 2 === 1) tilesCount -= 1;
  const pairsNeeded = Math.max(1, tilesCount / 2);

  const selected: string[] = [];
  // thor here error if not enough images
  for (let i = 0; selected.length < pairsNeeded; i++) {
    selected.push(images[i % images.length]);
  }

  const tiles: Tile[] = [];
  selected.forEach((img, idx) => {
    tiles.push({
      id: idx * 2,
      pairId: idx,
      image: img,
      revealed: false,
      matched: false,
    });
    tiles.push({
      id: idx * 2 + 1,
      pairId: idx,
      image: img,
      revealed: false,
      matched: false,
    });
  });

  return shuffle(tiles);
};

const LoversPairs: React.FC<LoversPairsProps> = ({
  images = DEFAULT_IMAGES,
  tilesCount = 6,
  onSolved,
}) => {
  // Generate tiles on initial load (or when props change)
  const initialTiles = useMemo(
    () => generateTiles(images, tilesCount),
    [images, tilesCount]
  );
  const { passLevel, getGameState } = useGameState();
  const [showAlert, setShowAlert] = useState(false);
  const [tiles, setTiles] = useState<Tile[]>(initialTiles);
  const [first, setFirst] = useState<number | null>(null);
  const [second, setSecond] = useState<number | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [time, setTime] = useState(0);
  const player = usePlayer();

  useEffect(() => {
    setTiles(initialTiles);
    setFirst(null);
    setSecond(null);
    setDisabled(false);
  }, [initialTiles]);

  useEffect(() => {
    const timer_interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => clearInterval(timer_interval);
  }, []);

  useEffect(() => {
    if (time != 0 && time % 30 === 0) {
      player.loseLife();
    }
    if (player.didPlayerLose()) {
      setShowAlert(true);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  useEffect(() => {
    if (first === null || second === null) return;
    const firstTile = tiles.find((t) => t.id === first);
    const secondTile = tiles.find((t) => t.id === second);
    if (!firstTile || !secondTile) return;

    setDisabled(true);
    if (firstTile.pairId === secondTile.pairId) {
      // Match
      setTiles((prev) =>
        prev.map((t) =>
          t.pairId === firstTile.pairId ? { ...t, matched: true } : t
        )
      );
      resetTurn();
    } else {
      // Not match - hide after short delay
      setTimeout(() => {
        setTiles((prev) =>
          prev.map((t) =>
            t.id === first || t.id === second ? { ...t, revealed: false } : t
          )
        );
        resetTurn();
      }, 700);
    }
  }, [first, second, tiles]);

  const resetTurn = () => {
    setFirst(null);
    setSecond(null);
    setDisabled(false);
  };

  const resetLevel = () => {
    player.resetLives();
    setShowAlert(false);
    setTime(0);
    setTiles(generateTiles(images, tilesCount));
    setFirst(null);
    setSecond(null);
    setDisabled(false);
  };

  const handleTileClick = (id: number) => {
    if (disabled) return;
    const clicked = tiles.find((t) => t.id === id);
    if (!clicked || clicked.revealed || clicked.matched) return;

    setTiles((prev) =>
      prev.map((t) => (t.id === id ? { ...t, revealed: true } : t))
    );

    if (first === null) {
      setFirst(id);
      return;
    }
    if (second === null && id !== first) {
      setSecond(id);
    }
  };

  const calculatePoints = () => {
    return Math.ceil((player.getPlayerScoreMultiplier() / (time || 1)) * 1000); // Avoid division by zero
  };

  const allMatched = tiles.every((t) => t.matched);

  useEffect(() => {
    if (allMatched) {
      passLevel(Levels.LOVERS_PAIRS, calculatePoints(), time);
      player.addScore(calculatePoints());
      player.resetLives();
      if (onSolved) {
        onSolved();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tiles, allMatched]);

  return (
    <div className="LoversPairs-container">
      <h2>{getGameState().levels[Levels.LOVERS_PAIRS].name}</h2>
      <div className="LoversPairs-timer">
        Czas: {player.didPlayerLose() ? 0 : formatTime(time)}
      </div>
      <div className="LoversPairs-description">
        <p>{getGameState().levels[Levels.LOVERS_PAIRS].description}</p>
      </div>

      <div
        className="LoversPairs-grid"
        style={{
          gridTemplateColumns: `repeat(${
            Math.min(6, Math.sqrt(tiles.length) | 0) || 4
          }, 1fr)`,
        }}
      >
        {tiles.map((tile) => (
          <div
            key={tile.id}
            className={`LoversPairs-tile ${
              tile.revealed || tile.matched ? "revealed" : ""
            } ${tile.matched ? "matched" : ""}`}
            onClick={() => handleTileClick(tile.id)}
          >
            <div className="LoversPairs-front" />
            <div className="LoversPairs-back">
              <img src={tile.image} alt="tile" />
            </div>
          </div>
        ))}
      </div>
      <div className="LoversPairs-controls">
        <DeclineButton
          onClick={() => {
            if (onSolved) {
              onSolved();
            }
            player.resetLives();
          }}
          label="Lista zadań"
        />
      </div>
      <ConfirmationAlert
        show={showAlert}
        message="Przegrałaś czy chcesz spróbować ponownie?"
        onCancel={() => {
          if (onSolved) {
            player.resetLives();
            onSolved();
          }
        }}
        onConfirm={resetLevel}
      />
    </div>
  );
};

export default LoversPairs;
