export enum Levels {
  TASK_LIST = -1,
  HEART_PIECES = 0,
  LOVE_PUZZLE = 1,
  LOVERS_PAIRS = 2,
}
export enum Difficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

export const INITIAL_GAME_STATE = {
  difficulty: Difficulty.EASY,
  levels: [
    {
      id: Levels.HEART_PIECES,
      name: "Serce z kawałków",
      description:
        "W tym zadaniu musisz wykazać się szybkością układając nasze wspólne zdjęcie. Możesz przesuwać jedynie kawałki, które sąsiadują ze sobą, klikając najpierw na jeden, później na drugi. Musisz się spieszyć bo co każde 30 sekund tracisz jedno życie. Powodzenia kochanie! 😘",
      image: "image1.png",
      score: 0,
      done: false,
      time: 0,
    },
    {
      id: Levels.LOVE_PUZZLE,
      name: "Miłosna krzyżówka",
      description:
        "Rozwiąż miłosną krzyżówkę pełną haseł związanych z naszymi wspólnymi wspomnieniami, ulubionymi miejscami i drobnymi tajemnicami. Każde poprawne słowo przybliża Cię do nagrody — uważaj na błędy, bo odejmują życie. Powodzenia, skarbie!",
      image: "image2.png",
      score: 0,
      done: false,
      time: 0,
    },
    {
      id: Levels.LOVERS_PAIRS,
      name: "Pary zakochanych",
      description: "Description of level 4",
      image: "image4.png",
      score: 0,
      done: false,
      time: 0,
    },
  ],
};
