/**
 * Calculate the winner of the game
 * @param {array} board - 9-element array representing the game board
 * @returns {string|null} 'X' or 'O' if there's a winner, null otherwise
 */
export const calculateWinner = (board) => {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let line of winningLines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

/**
 * Check if the board is completely filled
 * @param {array} board - 9-element array representing the game board
 * @returns {boolean} True if all squares are filled, false otherwise
 */
export const isBoardFull = (board) => board.every((square) => square !== null);

/**
 * Get the next player in turn
 * @param {string} currentPlayer - 'X' or 'O'
 * @returns {string} The next player
 */
export const getNextPlayer = (currentPlayer) =>
  currentPlayer === "X" ? "O" : "X";
