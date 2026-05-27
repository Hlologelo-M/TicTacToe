import "./App.css";
import { useGameState } from "./hooks/useGameState";
import { SCORE_PROPERTIES } from "./constants";
import Board from "./components/Board";
import Status from "./components/Status";
import Scoreboard from "./components/Scoreboard";
import GameModeSelector from "./components/GameModeSelector";

/**
 * Main App component - orchestrates the TicTacToe game
 */
function App() {
  const {
    state,
    makeMove,
    incrementScore,
    resetGame,
    resetScores,
    setGameMode,
  } = useGameState();

  const gameOver = state.winner || state.draw;
  const gameStarted = state.gameMode !== null;

  /**
   * Handle game mode selection
   */
  const handleGameModeSelect = (gameMode, humanPlayer) => {
    setGameMode(gameMode, humanPlayer);
  };

  /**
   * Handle square click and update score if game ends
   */
  const handleSquareClick = (index) => {
    makeMove(index);
  };

  /**
   * Reset game and increment score if there was a winner/draw
   */
  const handleReset = () => {
    if (state.winner) {
      incrementScore(state.winner);
    } else if (state.draw) {
      incrementScore(SCORE_PROPERTIES.DRAWS);
    }
    resetGame();
  };

  /**
   * Clear all scores
   */
  const handleResetScores = () => {
    resetScores();
  };

  // Show game mode selector if game hasn't started
  if (!gameStarted) {
    return (
      <div className="app">
        <h1>TicTacToe</h1>
        <GameModeSelector onSelectMode={handleGameModeSelect} />
      </div>
    );
  }

  return (
    <div className="app">
      <h1>TicTacToe</h1>

      <Status
        winner={state.winner}
        draw={state.draw}
        currentPlayer={state.currentPlayer}
      />

      <Board
        board={state.board}
        onSquareClick={handleSquareClick}
        gameOver={gameOver}
        isAIThinking={state.isAIThinking}
      />

      <div className="button-group">
        <button
          className="restart-btn"
          onClick={handleReset}
          type="button"
          aria-label={gameOver ? "Start next game" : "Reset current game"}
        >
          {gameOver ? "Next Game" : "Reset Game"}
        </button>
        <button
          className="reset-scores-btn"
          onClick={handleResetScores}
          type="button"
          aria-label="Reset all scores"
        >
          Reset Scores
        </button>
        <button
          className="change-mode-btn"
          onClick={() => setGameMode(null, null)}
          type="button"
          aria-label="Change game mode"
        >
          Change Mode
        </button>
      </div>

      <Scoreboard scores={state.scores} />
    </div>
  );
}

export default App;
