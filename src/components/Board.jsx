import React from "react";
import Square from "./Square";

/**
 * Board component - renders the 3x3 game board
 * @param {array} board - Array of 9 values ('X', 'O', or null)
 * @param {function} onSquareClick - Callback for square clicks
 * @param {boolean} gameOver - Whether the game has ended
 * @param {boolean} isAIThinking - Whether AI is currently thinking
 */
const Board = React.memo(({ board, onSquareClick, gameOver, isAIThinking }) => {
  return (
    <div className="board" role="grid" aria-label="TicTacToe game board">
      {board.map((value, index) => (
        <Square
          key={index}
          value={value}
          onClick={() => onSquareClick(index)}
          disabled={gameOver || isAIThinking}
        />
      ))}
    </div>
  );
});

Board.displayName = "Board";

export default Board;
