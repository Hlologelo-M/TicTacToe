// Action types
export const ACTION_TYPES = {
  MAKE_MOVE: "MAKE_MOVE",
  RESET: "RESET",
  INCREMENT_SCORE: "INCREMENT_SCORE",
  RESET_SCORES: "RESET_SCORES",
  SET_GAME_MODE: "SET_GAME_MODE",
  AI_MOVE: "AI_MOVE",
};

// Players
export const PLAYERS = {
  X: "X",
  O: "O",
};

// Game modes
export const GAME_MODES = {
  HUMAN_VS_HUMAN: "HUMAN_VS_HUMAN",
  HUMAN_VS_AI: "HUMAN_VS_AI",
};

// Game configuration
export const BOARD_SIZE = 9;
export const BOARD_DIMENSIONS = 3;

// Score properties
export const SCORE_PROPERTIES = {
  X_WINS: "X",
  O_WINS: "O",
  DRAWS: "draws",
};
