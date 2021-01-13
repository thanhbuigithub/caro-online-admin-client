import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Config from "../../../../config/Config";
import Cell from "./cell";
import "./index.css";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import FastForwardIcon from '@material-ui/icons/FastForward';
import {
    Avatar,
    Box,
    Chip,
    Container,
    Grid
} from '@material-ui/core';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
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
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
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


export default function CustomizedDialogs({ status, handleToggle }) {
    let cellsDiv = [];
    const board = Array(Config.boardSize.row)
        .fill(null)
        .map(() => {
            return Array(Config.boardSize.col).fill(null);
        })
    for (let i = 0; i < board.length; i += 1) {
        for (let j = 0; j < board[i].length; j += 1) {
            const key = i * Config.boardSize.col + j;
            cellsDiv.push(<Cell value={board[i][j]} row={i} col={j} key={key} />);
        }
    }
    return (
        <Dialog onClose={handleToggle} aria-labelledby="customized-dialog-title" open={status}>
            <DialogTitle id="customized-dialog-title" onClose={handleToggle}>
                <Box display="flex" justifyContent="flex-start">
                    <Chip
                        avatar={<Avatar src="/static/x.png" />}
                        label="User 1"
                        clickable
                        color="primary"
                        style={{ padding: '18px', fontSize: '20px' }}
                    />
                    <Chip label="Win" variant="outlined" style={{ marginLeft: '16px', marginRight: '16px', padding: '18px' }} />
                    <Chip
                        avatar={<Avatar src="/static/o.png" />}
                        label="User 2"
                        clickable
                        style={{ padding: '18px', fontSize: '20px' }}
                    />
                </Box>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    style={{ width: '65%' }}
                    mt={2}>

                    <IconButton aria-label="delete">
                        <FastRewindIcon fontSize="large" />
                    </IconButton>
                    <IconButton aria-label="delete">
                        <PlayCircleFilledIcon fontSize="large" />
                    </IconButton>
                    <IconButton aria-label="delete">
                        <FastForwardIcon fontSize="large" />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent dividers>
                <Container maxWidth={false}>
                    <Grid container spacing={3}>

                    </Grid>
                </Container>
                <div className="board">
                    {cellsDiv}
                </div>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleToggle} color="primary">
                    Save changes
          </Button>
            </DialogActions>
        </Dialog>
    );
}
