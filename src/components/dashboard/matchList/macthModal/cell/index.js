import React, { useContext } from "react";
import { useState } from "react";
import "./index.css";
import config from "../../../../../config/Config";

function Cell({ value, row, col }) {


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
      className={'cell'}
      row={row}
      col={col}
    >
      {chessAssetFromValue(value)}
    </div>
  );
}

export default Cell;
