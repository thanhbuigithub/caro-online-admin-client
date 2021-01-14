import React, { useContext } from "react";
import { useState } from "react";
import "./index.css";
import config from "../../../../../config/Config";

function Cell({ value, row, col, isWinnerCell, isCurrentCell }) {
  const chessAssetFromValue = (value) => {
    switch (value) {
      case config.playerX:
        return "/x.png";
      case config.playerO:
        return "/o.png";
      default:
        return "";
    }
  };

  return (
    <div
      className={`cell ${isWinnerCell ? "winner-cell" : ""} ${
        isCurrentCell ? "prev-move" : ""
      }`}
      row={row}
      col={col}
    >
      {chessAssetFromValue(value) === "" ? null : (
        <img src={chessAssetFromValue(value)}></img>
      )}
    </div>
  );
}

export default Cell;
