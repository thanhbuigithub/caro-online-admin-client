import React, { useContext } from "react";
import { useState } from "react";
import "./index.css";
import config from "../../../../../config/Config";

function checkWinCell(winLine, row, col) {
  if (winLine == null) {
    return false;
  }

  for (let i = 0; i < winLine.length; i += 1) {
    const curCell = winLine[i];
    if (curCell.x === row && curCell.y === col) {
      return true;
    }
  }
  return false;
}

function Cell({ value, row, col }) {

  const needToDisable = false;


  const chessAssetFromValue = (value) => {
    switch (value) {
      case config.playerX:
        return "X";
      case config.playerO:
        return "O";
      default:
        return "";
    }
  };

  return (
    <div
      row={row}
      col={col}
    >
      {chessAssetFromValue(value)}
    </div>
  );
}

export default Cell;
