export enum Levels {
  TASK_LIST = -1,
  HEART_PIECES = 0,
  LOVE_PUZZLE = 1,
  CUPID_ARROW = 2,
  LOVERS_PAIRS = 3,
  LOVE_QUIZ = 4,
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
      description: "Description of level 1",
      image: "image1.png",
      score: 0,
      done: false,
      time: 0,
    },
    {
      id: Levels.LOVE_PUZZLE,
      name: "Miłosna łamigłówka",
      description: "Description of level 2",
      image: "image2.png",
      score: 0,
      done: false,
      time: 0,
    },
    {
      id: Levels.CUPID_ARROW,
      name: "Strzała Amora",
      description: "Description of level 3",
      image: "image3.png",
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
    {
      id: Levels.LOVE_QUIZ,
      name: "Miłosny Quiz",
      description: "Description of level 5",
      image: "image5.png",
      score: 0,
      done: false,
      time: 0,
    },
  ],
};
