import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function NestedGrid({ size }) {
    const classes = useStyles();

    function FormRow({ step }) {
        return (
            <React.Fragment>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Button variant="contained"
                            color="primary"
                            fullWidth>
                            {step + 1}
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Button variant="contained"
                            color="primary"
                            fullWidth>
                            {step + 2}
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Button variant="contained"
                            color="primary"
                            fullWidth>
                            {step + 3}
                        </Button>
                    </Paper>
                </Grid>
            </React.Fragment>
        );
    }
    console.log(Math.round(size / 3));
    console.log(size % 3);
    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                {Array(Math.floor(size / 3)).fill(null).map((item, index) => (
                    <Grid
                        key={index}
                        container
                        item
                        xs={12}
                        spacing={3}>
                        <FormRow step={index * 3} />
                    </Grid>
                ))}
                <Grid
                    container
                    item
                    xs={12}
                    spacing={3}>
                    {Array(size % 3).fill(null).map((item, index) => (
                        <Grid item xs={4} key={index}>
                            <Paper className={classes.paper}>
                                <Button variant="contained"
                                    color="primary"
                                    fullWidth>
                                    {(size / 3) * 3 + index}
                                </Button>
                            </Paper>
                        </Grid>
                    ))}

                </Grid>

            </Grid>
        </div>
    );
}
