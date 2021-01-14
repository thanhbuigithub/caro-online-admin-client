import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Config from "../../../../config/Config";
import Cell from "./cell";
import CellStep from "./cellStep";
import "./index.css";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import FastRewindIcon from "@material-ui/icons/FastRewind";
import FastForwardIcon from "@material-ui/icons/FastForward";
import { Avatar, Box, Chip, Container, Grid } from "@material-ui/core";
import Chat from "./chat";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const useStyles = makeStyles((theme) => ({
  root: {
    height: "95vh",
  },
  cellStep: {
    height: "250px",
    overflow: "auto",
    marginBottom: "20px",
  },
}));

export default function CustomizedDialogs({
  status,
  handleToggle,
  listGame,
  gameIndex,
}) {
  console.log(gameIndex);
  const [currentMove, setCurrentMove] = useState(0);
  const [play, setPlay] = useState(false);
  let playInterval = null;
  const classes = useStyles();
  let game = undefined;
  if (listGame && gameIndex !== undefined) game = listGame[gameIndex];
  let history = [];
  let winner = null;
  let winLine = [];
  let chatHistory = [];
  if (game) {
    history = game.history;
    winner = game.winner;
    winLine = game.winLine;
    chatHistory = game.chatHistory;
  }

  const handleToggleClose = () => {
    handleToggle();
    setCurrentMove(0);
  };

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

  const getCellDiv = (stepMove) => {
    const cellsDiv = [];
    const board = Array(Config.boardSize.row)
      .fill(null)
      .map(() => {
        return Array(Config.boardSize.col).fill(null);
      });

    for (let i = 0; i <= currentMove; i += 1) {
      const move = history[i];
      if (move) board[move.x][move.y] = move.chess;
    }

    for (let i = 0; i < board.length; i += 1) {
      for (let j = 0; j < board[i].length; j += 1) {
        const key = i * Config.boardSize.col + j;
        const isWinnerCell =
          history.length - 1 === currentMove && checkWinCell(winLine, i, j);
        let isCurrentCell = false;
        if (history.length > 0) {
          isCurrentCell =
            history[currentMove].x === i && history[currentMove].y === j;
        }
        cellsDiv.push(
          <Cell
            value={board[i][j]}
            row={i}
            col={j}
            key={key}
            isWinnerCell={isWinnerCell}
            isCurrentCell={isCurrentCell}
          />
        );
      }
    }
    return cellsDiv;
  };

  const prev = () => {
    if (currentMove > 0) {
      setCurrentMove(currentMove - 1);
    }
    setPlay(false);
  };

  const next = () => {
    if (currentMove < history.length - 1) {
      setCurrentMove(currentMove + 1);
    }
    setPlay(false);
  };

  const playMatch = () => {
    setPlay(true);
  };

  const stopMatch = () => {
    setPlay(false);
  };

  useEffect(() => {
    playInterval = setInterval(() => {
      if (play && currentMove < history.length - 1) {
        setCurrentMove(currentMove + 1);
      }
    }, 2000);
    return () => {
      clearInterval(playInterval);
    };
  }, [playInterval, currentMove, play]);

  return (
    <Dialog
      fullWidth
      maxWidth="xl"
      onClose={handleToggleClose}
      className={classes.root}
      aria-labelledby="customized-dialog-title"
      open={status}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleToggleClose}>
        <Box display="flex" alignItems="center">
          <Box display="flex" justifyContent="center">
            <Chip
              avatar={<Avatar src="/static/x.png" />}
              label={game && game.playerX.username}
              clickable
              color="primary"
              style={{ padding: "18px", fontSize: "20px" }}
            />
            <Chip
              label={winner === null ? "Hoà" : winner === 1 ? "Thắng" : "Thua"}
              variant="outlined"
              style={{
                marginLeft: "16px",
                marginRight: "16px",
                padding: "18px",
              }}
            />
            <Chip
              avatar={<Avatar src="/static/o.png" />}
              label={game && game.playerO.username}
              clickable
              style={{ padding: "18px", fontSize: "20px" }}
            />
          </Box>
          <Box ml={3} display="flex" justifyContent="flex-start">
            <IconButton aria-label="delete" onClick={prev}>
              <FastRewindIcon fontSize="large" />
            </IconButton>
            {play ? (
              <IconButton aria-label="delete" onClick={stopMatch}>
                <PauseCircleFilledIcon fontSize="large" />
              </IconButton>
            ) : (
              <IconButton aria-label="delete" onClick={playMatch}>
                <PlayCircleFilledIcon fontSize="large" />
              </IconButton>
            )}
            <IconButton aria-label="delete" onClick={next}>
              <FastForwardIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={8} sm={8} xl={8} xs={12}>
              <div className="board">{getCellDiv(currentMove)}</div>
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={12}>
              <Grid item className={classes.cellStep}>
                <CellStep
                  size={history.length}
                  setCurrentMove={setCurrentMove}
                  currentMove={currentMove}
                />
              </Grid>
              <Grid item className={classes.history}>
                <Chat chatHistory={chatHistory} />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </DialogContent>
    </Dialog>
  );
}
