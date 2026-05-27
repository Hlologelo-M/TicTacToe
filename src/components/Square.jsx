import React from "react";

/**
 * Square component - represents a single game cell
 * @param {string|null} value - 'X', 'O', or null
 * @param {function} onClick - Callback when square is clicked
 * @param {boolean} disabled - Whether square is disabled
 */
const Square = React.memo(({ value, onClick, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <button
      className={`square ${value ? "filled" : ""} ${disabled ? "disabled" : ""}`}
      onClick={handleClick}
      disabled={disabled}
      aria-label={`Square ${value || "empty"}`}
      type="button"
    >
      {value}
    </button>
  );
});

Square.displayName = "Square";

export default Square;
