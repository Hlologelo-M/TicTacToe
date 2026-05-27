import React from "react";
import { GAME_MODES, PLAYERS } from "../constants";

/**
 * GameModeSelector component - allows player to choose game mode
 * @param {function} onSelectMode - Callback when mode is selected with (gameMode, humanPlayer)
 */
const GameModeSelector = React.memo(({ onSelectMode }) => {
  return (
    <div className="game-mode-selector">
      <h2>Choose Game Mode</h2>
      <div className="mode-buttons">
        <button
          className="mode-btn"
          onClick={() => onSelectMode(GAME_MODES.HUMAN_VS_HUMAN, PLAYERS.X)}
          type="button"
        >
          👥 Human vs Human
        </button>
        <button
          className="mode-btn"
          onClick={() => onSelectMode(GAME_MODES.HUMAN_VS_AI, PLAYERS.X)}
          type="button"
        >
          🤖 Human vs AI (You are X)
        </button>
        <button
          className="mode-btn"
          onClick={() => onSelectMode(GAME_MODES.HUMAN_VS_AI, PLAYERS.O)}
          type="button"
        >
          🤖 Human vs AI (You are O)
        </button>
      </div>
    </div>
  );
});

GameModeSelector.displayName = "GameModeSelector";

export default GameModeSelector;
