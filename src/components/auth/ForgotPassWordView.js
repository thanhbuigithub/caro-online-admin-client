import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
import EmailIcon from "@material-ui/icons/Email";
import PageTittle from '../PageTittle';
import forgotPassword from '../../library/images/forgotPassword.svg';
import userApi from "../../api/userApi";
import swal from 'sweetalert';
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,

        height: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3),
        backgroundImage: `url(${forgotPassword})`,
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
        boxShadow: theme.shadows[24],
        borderRadius: '5px'
    },
    tittle: {
        background: 'linear-gradient(to left,rgba(116,235,213,0.6),rgba(159,172,230,0.6))',
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
    divider: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '30px 0px'
    },
    solid: {
        borderTop: '1px solid #bbb',
        margin: '0 2px',
        width: '40%',
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
    }
}));

const ForgotPassWordView = () => {
    const classes = useStyles();
    const navigate = useNavigate();
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
                    <Formik
                        initialValues={{
                            email: '',
                        }}
                        validationSchema={
                            Yup.object().shape({
                                email: Yup.string().email('Email must be valid').max(255).required('Email is required'),
                            })
                        }
                        onSubmit={async (values, { resetForm }) => {
                            try {
                                const res = await userApi.forgotPassword(values.email);
                                console.log(res);
                                await swal('Hola !', res.message, 'success', { timer: 2000 });
                                resetForm();
                            } catch (err) {
                                await swal({
                                    title: 'Opps!',
                                    text: err.response.data,
                                    icon: 'error',
                                    buttons: false,
                                    timer: 2000,
                                });
                                resetForm();
                            }

                        }}
                    >
                        {({
                            errors,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            isSubmitting,
                            touched,
                            values
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Box textAlign="center" style={{ margin: '-2em -1.5em 0.5em -1.5em' }}>
                                    <Typography
                                        color="textPrimary"
                                        className={classes.tittle}                                    >
                                        Reset your password
                                 </Typography>
                                </Box>
                                <TextField
                                    error={Boolean(touched.email && errors.email)}
                                    fullWidth
                                    helperText={touched.email && errors.email}
                                    label="Email"
                                    margin="normal"
                                    name="email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon />
                                            </InputAdornment>
                                        ),
                                    }} />
                                <Box my={2}>
                                    <Button
                                        color="primary"
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                    >
                                        RESET PASSWORD
                                     </Button>
                                </Box>
                                <div className={classes.divider}>
                                    <hr className={classes.solid} />
                                    <Typography
                                        align="center"
                                        color="textSecondary"
                                        variant="body1"
                                    >
                                        OR
                  </Typography>
                                    <hr className={classes.solid} />
                                </div>
                                <Box my={2}>
                                    <Button
                                        onClick={() => { navigate('/login') }}
                                        className={classes.signupButton}
                                        fullWidth
                                        variant="contained"
                                        color="primary">Back to Login
                                    </Button>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Container>
            </Box>
        </PageTittle>
    );
};

export default ForgotPassWordView;
