import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    makeStyles,
    InputAdornment
} from '@material-ui/core';
import PageTittle from '../PageTittle';
import authentication from '../../library/images/authentication.svg';
import userApi from "../../api/userApi";
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        height: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3),
        backgroundImage: `url(${authentication})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right bottom',
        positionAttachment: 'fixed',
        backgroundSize: '300px 300px',
        [theme.breakpoints.down('sm')]: {
            backgroundImage: 'none',
        },
        [theme.breakpoints.down('md')]: {
            backgroundSize: '200px 200px',
        },
    },
    container: {
        backgroundColor: theme.palette.background.paper,
        padding: '2em 1.5em',
        boxShadow: theme.shadows[24]
    },
    divider: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '30px 0px'
    },
    solid: {
        borderTop: '1px solid #bbb',
        margin: '0 2px',
        width: '30%',
        height: '0px'
    },
    link: {
        color: '#145cf2',
        fontWeight: '700',
        '&:hover': {
            textDecoration: 'none',
        }
    },
    signupButton: {
        padding: '10px',
        backgroundColor: '#048DFF',
        '&:hover': {
            backgroundColor: '#3CB3FF'
        }
    },
    activeButton: {
        padding: '10px',
        // backgroundColor: '#048DFF',
        // '&:hover': {
        //     backgroundColor: '#3CB3FF'
        // }
    },
    tittle: {
        color: '#5850EC',
        fontFamily: 'ThirstyScriptRegular',
        fontSize: '3rem',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '2rem',
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '3rem',
        },
    },
}));

const ActiveAccountView = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const token = useParams();

    useEffect(() => {
        const verifyAccount = async () => {
            try {
                const res = await userApi.active(token);
                await swal('Hola !', 'You have been registered successfully!', 'success', { timer: 2000 });
            } catch (err) {
                await swal({
                    title: 'Opps!',
                    text: err.response.data,
                    icon: 'error',
                    buttons: false,
                    timer: 2000,
                });
            }
        };
        verifyAccount();
    }, []);

    return (
        <PageTittle
            className={classes.root}
            title="Forgot Password"
        >
            <Box
                display="flex"
                flexDirection="column"
                height="100%"
                justifyContent="center"
                style={{ marginTop: '10px' }}
            >
                <Container maxWidth="sm" className={classes.container}>
                    <Box mb={2} textAlign="center">
                        <Typography
                            color="textPrimary"
                            className={classes.tittle}                                    >
                            Welcome to Caro
                                 </Typography>
                    </Box>
                    <Box my={2}>
                        <Button
                            onClick={() => { navigate('/login') }}
                            className={classes.activeButton}
                            fullWidth
                            variant="contained"
                            color="primary">
                            Login now
                        </Button>
                    </Box>
                    <div className={classes.divider}>
                        <hr className={classes.solid} />
                        <Typography
                            align="center"
                            color="textSecondary"
                            variant="caption"
                        >
                            OR REGISTER AGAIN
                  </Typography>
                        <hr className={classes.solid} />
                    </div>
                    <Box my={2}>
                        <Button
                            onClick={() => { navigate('/register') }}
                            className={classes.signupButton}
                            fullWidth
                            variant="contained"
                            color="primary">Back to register
                                    </Button>
                    </Box>
                </Container>
            </Box>
        </PageTittle>
    );
};

export default ActiveAccountView;
