import React from "react";

/**
 * Scoreboard component - displays cumulative scores
 * @param {object} scores - Object with X, O, and draws properties
 */
const Scoreboard = React.memo(({ scores }) => {
  return (
    <div
      className="scoreboard"
      role="complementary"
      aria-label="Game scoreboard"
    >
      <div className="score-item">
        <span className="player-x">X Wins</span>
        <span className="score-value">{scores.X || 0}</span>
      </div>
      <div className="score-item">
        <span className="draws">Draws</span>
        <span className="score-value">{scores.draws || 0}</span>
      </div>
      <div className="score-item">
        <span className="player-o">O Wins</span>
        <span className="score-value">{scores.O || 0}</span>
      </div>
    </div>
  );
});

Scoreboard.displayName = "Scoreboard";

export default Scoreboard;
