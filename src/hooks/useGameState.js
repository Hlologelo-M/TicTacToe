import { useReducer, useEffect } from "react";
import {
  ACTION_TYPES,
  PLAYERS,
  SCORE_PROPERTIES,
  GAME_MODES,
} from "../constants";
import {
  calculateWinner,
  isBoardFull,
  getNextPlayer,
} from "../utils/gameLogic";
import { getAIMove } from "../utils/aiLogic";

const initialState = {
  board: Array(9).fill(null),
  currentPlayer: PLAYERS.X,
  winner: null,
  draw: false,
  scores: { [PLAYERS.X]: 0, [PLAYERS.O]: 0, [SCORE_PROPERTIES.DRAWS]: 0 },
  gameMode: null,
  humanPlayer: null,
  isAIThinking: false,
};

/**
 * Game reducer function - manages all game state transitions
 */
function gameReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.MAKE_MOVE: {
      const { index } = action;

      // Prevent move if square is occupied or game is already over
      if (state.board[index] || state.winner || state.draw) {
        return state;
      }

      const newBoard = [...state.board];
      newBoard[index] = state.currentPlayer;

      const winner = calculateWinner(newBoard);
      const isDraw = !winner && isBoardFull(newBoard);

      return {
        ...state,
        board: newBoard,
        currentPlayer: getNextPlayer(state.currentPlayer),
        winner: winner,
        draw: isDraw,
      };
    }

    case ACTION_TYPES.RESET: {
      return {
        ...initialState,
        scores: state.scores,
        gameMode: state.gameMode,
        humanPlayer: state.humanPlayer,
      };
    }

    case ACTION_TYPES.INCREMENT_SCORE: {
      const { player } = action;
      return {
        ...state,
        scores: {
          ...state.scores,
          [player]: state.scores[player] + 1,
        },
      };
    }

    case ACTION_TYPES.RESET_SCORES: {
      return {
        ...state,
        scores: { [PLAYERS.X]: 0, [PLAYERS.O]: 0, [SCORE_PROPERTIES.DRAWS]: 0 },
      };
    }

    case ACTION_TYPES.SET_GAME_MODE: {
      const { gameMode, humanPlayer } = action;
      if (gameMode === null) {
        return {
          ...initialState,
          scores: state.scores,
          gameMode: null,
        };
      }
      return {
        ...initialState,
        scores: state.scores,
        gameMode,
        humanPlayer,
      };
    }

    case ACTION_TYPES.AI_MOVE: {
      const { index } = action;
      if (state.board[index] !== null) return state;

      const newBoard = [...state.board];
      newBoard[index] = state.currentPlayer;

      const winner = calculateWinner(newBoard);
      const isDraw = !winner && isBoardFull(newBoard);

      return {
        ...state,
        board: newBoard,
        currentPlayer: getNextPlayer(state.currentPlayer),
        winner: winner,
        draw: isDraw,
        isAIThinking: false,
      };
    }

    default:
      return state;
  }
}

/**
 * Custom hook for managing TicTacToe game state with AI support
 * @returns {object} Game state and dispatch function
 */
export const useGameState = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Trigger AI move when it's AI's turn
  useEffect(() => {
    if (
      state.gameMode !== GAME_MODES.HUMAN_VS_AI ||
      state.winner ||
      state.draw ||
      state.isAIThinking
    ) {
      return;
    }

    const isAITurn = state.currentPlayer !== state.humanPlayer;
    if (!isAITurn) return;

    // Simulate thinking time
    const timer = setTimeout(() => {
      const aiPlayer = state.currentPlayer;
      const opponentPlayer = state.humanPlayer;
      const moveIndex = getAIMove(state.board, aiPlayer, opponentPlayer);

      if (moveIndex !== null) {
        dispatch({ type: ACTION_TYPES.AI_MOVE, index: moveIndex });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [state]);

  return {
    state,
    dispatch,
    makeMove: (index) => dispatch({ type: ACTION_TYPES.MAKE_MOVE, index }),
    resetGame: () => dispatch({ type: ACTION_TYPES.RESET }),
    incrementScore: (player) =>
      dispatch({ type: ACTION_TYPES.INCREMENT_SCORE, player }),
    resetScores: () => dispatch({ type: ACTION_TYPES.RESET_SCORES }),
    setGameMode: (gameMode, humanPlayer) =>
      dispatch({ type: ACTION_TYPES.SET_GAME_MODE, gameMode, humanPlayer }),
  };
};
