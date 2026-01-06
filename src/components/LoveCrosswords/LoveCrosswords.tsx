import { PlayerState, usePlayer } from "../../contexts/PlayerContext";
import { useEffect, useState } from "react";
import "./LoveCrosswords.css";
import ConfirmationAlert from "../ConfirmationAlert/ConfirmationAlert";
import { useGameState } from "../../contexts/GameStateContext";
import { Levels } from "../../helpers/constants";
import DeclineButton from "../DeclineButton/DeclineButton";
import { formatTime } from "../../helpers/time";

type CrosswordWord = { word: string; clue: string };

const WORDS: CrosswordWord[] = [
  { word: "OLIWIA", clue: "Imię najważniejszej osoby w grze" },
  { word: "WARSZAWA", clue: "W tym mieście był nasz pierwszy wspólny wyjazd" },
  { word: "RANDKA", clue: "Spotkanie tylko we dwoje" },
  { word: "MIŁOŚĆ", clue: "Najważniejsze uczucie" },
  { word: "MIZIANIE", clue: "Oliwia to uwielbia" },
  {
    word: "NOSFERATU",
    clue: "Pierwszy (i jedyny XD) film na którym byliśmy w kinie",
  },
  { word: "TORT", clue: "Edytowałem tam twój wiek" },
  { word: "BARCELONA", clue: "Byliśmy tam na pierwszym wyjeździe za granicę" },
  { word: "TUNEZJA", clue: "Pierwsze wspólne wakacje" },
  { word: "ALI", clue: "Poznaliśmy na wyjeździe" },
  { word: "USTROŃ", clue: "Byliśmy tam na sylwestrze" },
  { word: "OLKA", clue: "Atencjuszka na studiach" },
  { word: "DREZYNA", clue: "Rower ale na torach" },
  {
    word: "ŚWIATEŁ",
    clue: "W tym ogrodzie mieliśmy pierwsze zdjęcie (Ogród ...)",
  },
  { word: "BRYTOLEK", clue: "Twoje prawie praca XD" },
  { word: "LINDORKI", clue: "Ulubione słodycze Oliwii" },
];

const WORDS_AMOUNT = 10;

const composeCrosswordsWords = (words: typeof WORDS): CrosswordWord[] => {
  const crossword: CrosswordWord[] = [];
  const usedIndices: Set<number> = new Set();
  for (let i = 0; i < WORDS_AMOUNT; i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    if (crossword.length == 0) {
      crossword.push(words[randomIndex]);
      usedIndices.add(randomIndex);
      continue;
    }
    if (usedIndices.has(randomIndex)) {
      i--;
      continue;
    }
    crossword.push(words[randomIndex]);
    usedIndices.add(randomIndex);
  }
  return crossword;
};

const createInputForLetter = (
  letterIndex: number,
  word: string,
  player: PlayerState
) => {
  return (
    <input
      type="text"
      maxLength={1}
      className="LoveCrosswords-letter-input"
      data-letter-index={letterIndex}
      onInput={(e) => {
        const input = e.currentTarget as HTMLInputElement;
        const next = input.parentElement?.nextElementSibling?.querySelector(
          "input"
        ) as HTMLInputElement | null;
        if (input.value.length >= 1) {
          const allInputs =
            input.parentElement?.parentElement?.querySelectorAll(
              "input"
            ) as NodeListOf<HTMLInputElement>;
          const allFilled = Array.from(allInputs).every(
            (inp) => inp.value.length === 1
          );
          next?.focus();
          if (allFilled) {
            const wordTogether = Array.from(allInputs)
              .map((inp) => inp.value.toUpperCase())
              .join("");
            if (wordTogether === word) {
              allInputs.forEach((inp) => {
                inp.classList.remove("LoveCrosswords-incorrect");
                inp.classList.add("LoveCrosswords-correct");
              });
            } else {
              player.loseLife();
              allInputs.forEach((inp) => {
                inp.classList.remove("LoveCrosswords-correct");
                inp.classList.add("LoveCrosswords-incorrect");
              });
            }
          } else {
            allInputs.forEach((inp) => {
              inp.classList.remove("LoveCrosswords-correct");
              inp.classList.remove("LoveCrosswords-incorrect");
            });
          }
        }
      }}
      onKeyDown={(e) => {
        const input = e.currentTarget as HTMLInputElement;

        // If Backspace pressed on an empty input, move focus to previous input
        if (e.key === "Backspace") {
          e.preventDefault();

          const prev =
            input.parentElement?.previousElementSibling?.querySelector(
              "input"
            ) as HTMLInputElement | null;

          const allInputs =
            input.parentElement?.parentElement?.querySelectorAll(
              "input"
            ) as NodeListOf<HTMLInputElement>;
          console.log({ allInputs });
          allInputs.forEach((inp) => {
            inp.classList.remove("LoveCrosswords-correct");
            inp.classList.remove("LoveCrosswords-incorrect");
          });
          if (input.value === "") {
            prev?.focus();
            if (prev) {
              prev.value = "";
            }
          }
          input.value = "";
        }
      }}
    />
  );
};
interface LoveCrosswordsProps {
  onSolved?: () => void;
}
const LoveCrosswords = ({ onSolved }: LoveCrosswordsProps) => {
  // Generate crossword words only once on initial load
  const [crosswordWords, setCrosswordsWords] = useState(
    composeCrosswordsWords(WORDS)
  );
  const [time, setTime] = useState(0);
  const player = usePlayer();
  const { passLevel, getGameState } = useGameState();
  const [showAlert, setShowAlert] = useState(false);

  const resetLevel = () => {
    player.resetLives();
    setShowAlert(false);
    setTime(0);
    setCrosswordsWords(composeCrosswordsWords(WORDS));
    //add here clear all inputs
    const allInputs = document.querySelectorAll(
      ".LoveCrosswords-letter-input"
    ) as NodeListOf<HTMLInputElement>;
    allInputs.forEach((inp) => {
      inp.value = "";
      inp.classList.remove("LoveCrosswords-correct");
      inp.classList.remove("LoveCrosswords-incorrect");
    });
  };

  useEffect(() => {
    const timer_interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => clearInterval(timer_interval);
  }, []);

  useEffect(() => {
    if (player.didPlayerLose()) {
      setShowAlert(true);
      return;
    }
    const allInputs = document.querySelectorAll(
      ".LoveCrosswords-letter-input"
    ) as NodeListOf<HTMLInputElement>;
    let allCorrect = true;
    allInputs.forEach((inp) => {
      if (!inp.classList.contains("LoveCrosswords-correct")) {
        allCorrect = false;
      }
    });

    const calculatePoints = () => {
      return Math.ceil(
        (player.getPlayerScoreMultiplier() / (time || 1)) * 1000
      ); // Avoid division by zero
    };

    if (allCorrect && onSolved) {
      passLevel(Levels.LOVE_PUZZLE, calculatePoints(), time);
      player.addScore(calculatePoints());
      player.resetLives();
      onSolved();
    }
  }, [player, onSolved, passLevel, time]);

  return (
    <div className="LoveCrosswords-container">
      <h2>{getGameState().levels[Levels.LOVE_PUZZLE].name}</h2>
      <div className="LoveCrosswords-timer">
        Czas: {player.didPlayerLose() ? 0 : formatTime(time)}
      </div>
      <div className="LoveCrosswords-description">
        <p>{getGameState().levels[Levels.LOVE_PUZZLE].description}</p>
      </div>
      <div className="LoveCrosswords-grid">
        <tbody>
          {crosswordWords.map((crosswordWord, index) => (
            <tr key={index} className="LoveCrosswords-row">
              <td className="LoveCrosswords-clue-cell">
                <span className="LoveCrosswords-clue-number">{index + 1}.</span>{" "}
                {crosswordWord.clue}
              </td>
              <td className="LoveCrosswords-inputs-cell">
                {crosswordWord.word.split("").map((_, letterIndex) => (
                  <span key={letterIndex}>
                    {createInputForLetter(
                      letterIndex,
                      crosswordWord.word,
                      player
                    )}
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>

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
      <div className="LoveCrosswords-controls">
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
    </div>
  );
};

export default LoveCrosswords;
