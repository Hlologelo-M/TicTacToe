import React from "react";

/**
 * Status component - displays game status
 * @param {string|null} winner - 'X', 'O', or null
 * @param {boolean} draw - Whether the game is a draw
 * @param {string} currentPlayer - 'X' or 'O'
 */
const Status = React.memo(({ winner, draw, currentPlayer }) => {
  let status;

  if (winner) {
    status = `🏆 Winner: ${winner}`;
  } else if (draw) {
    status = "🤝 It's a Draw!";
  } else {
    status = `Next Player: ${currentPlayer}`;
  }

  return (
    <div className="status" role="status" aria-live="polite" aria-atomic="true">
      {status}
    </div>
  );
});

Status.displayName = "Status";

export default Status;
