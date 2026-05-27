import { calculateWinner } from "./gameLogic";
import { PLAYERS } from "../constants";

/**
 * Simple AI strategy for TicTacToe
 * Priority:
 * 1. Win if possible
 * 2. Block opponent from winning
 * 3. Take center
 * 4. Take corners
 * 5. Take any available space
 *
 * @param {array} board - Current game board
 * @param {string} aiPlayer - 'X' or 'O'
 * @param {string} humanPlayer - 'X' or 'O'
 * @returns {number} Index of the move to make (0-8)
 */
export const getAIMove = (board, aiPlayer, humanPlayer) => {
  const availableSquares = board
    .map((square, index) => (square === null ? index : null))
    .filter((index) => index !== null);

  if (availableSquares.length === 0) return null;

  // 1. Check if AI can win
  const winningMove = findWinningMove(board, aiPlayer);
  if (winningMove !== null) return winningMove;

  // 2. Check if need to block opponent
  const blockingMove = findWinningMove(board, humanPlayer);
  if (blockingMove !== null) return blockingMove;

  // 3. Take center if available
  if (availableSquares.includes(4)) return 4;

  // 4. Take a corner
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter((c) => availableSquares.includes(c));
  if (availableCorners.length > 0) {
    return availableCorners[
      Math.floor(Math.random() * availableCorners.length)
    ];
  }

  // 5. Take any available space
  return availableSquares[Math.floor(Math.random() * availableSquares.length)];
};

/**
 * Find a winning move for a player if one exists
 *
 * @param {array} board - Current game board
 * @param {string} player - 'X' or 'O'
 * @returns {number|null} Index of winning move or null
 */
const findWinningMove = (board, player) => {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      const testBoard = [...board];
      testBoard[i] = player;
      if (calculateWinner(testBoard) === player) {
        return i;
      }
    }
  }
  return null;
};
