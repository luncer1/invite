import React, { useEffect, useMemo, useState } from "react";
import "./LoversPairs.css";
import heartImg from "../../assets/Heart_pieces_img.JPEG";

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
};

const DEFAULT_IMAGES = [heartImg, heartImg, heartImg];

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
  tilesCount = 30,
}) => {
  // Generate tiles on initial load (or when props change)
  const initialTiles = useMemo(
    () => generateTiles(images, tilesCount),
    [images, tilesCount]
  );
  const [tiles, setTiles] = useState<Tile[]>(initialTiles);
  const [first, setFirst] = useState<number | null>(null);
  const [second, setSecond] = useState<number | null>(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setTiles(initialTiles);
    setFirst(null);
    setSecond(null);
    setDisabled(false);
  }, [initialTiles]);

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

  const resetGame = () => {
    const newTiles = generateTiles(images, tilesCount);
    setTiles(newTiles);
    setFirst(null);
    setSecond(null);
    setDisabled(false);
  };

  const allMatched = tiles.every((t) => t.matched);

  return (
    <div className="LoversPairs-container">
      <h3>Lovers Pairs — Memory Game</h3>
      <div className="LoversPairs-controls">
        <button onClick={resetGame}>New Game</button>
        <span className="LoversPairs-status">
          {allMatched ? "You win! 🎉" : "Find pairs"}
        </span>
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
    </div>
  );
};

export default LoversPairs;
