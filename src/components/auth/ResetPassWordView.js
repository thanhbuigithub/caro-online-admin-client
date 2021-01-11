import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormHelperText,
    Link,
    TextField,
    Typography,
    makeStyles,
    InputAdornment
} from '@material-ui/core';

import VpnKeyIcon from "@material-ui/icons/VpnKey";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonIcon from "@material-ui/icons/Person";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import EmailIcon from "@material-ui/icons/Email";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import PageTittle from '../../components/PageTittle';
import loginBackGroundLeft from '../../library/images/loginBackgroundLeft.svg';
import loginBackGroundRight from '../../library/images/loginBackgroundRight.svg';
import userApi from "../../api/userApi";
import swal from 'sweetalert';
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        height: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3),
        backgroundImage: `url(${loginBackGroundLeft}),url(${loginBackGroundRight})`,
        backgroundRepeat: 'no-repeat,no-repeat',
        backgroundPosition: 'left bottom,right bottom',
        positionAttachment: 'fixed,fixed',
        backgroundSize: '300px 300px,300px 300px',
        [theme.breakpoints.down('sm')]: {
            backgroundImage: 'none',
        },
        [theme.breakpoints.down('md')]: {
            backgroundSize: '200px 200px,200px 200px',
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
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
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
    }
}));

const RegisterView = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const token = useParams();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    return (
        <PageTittle
            className={classes.root}
            title="Register"
        >
            <Box
                display="flex"
                flexDirection="column"
                height="100%"
                justifyContent="center"
            >
                <Container maxWidth="sm" className={classes.container}>
                    <Formik
                        initialValues={{
                            password: '',
                            confirmPassword: '',
                        }}
                        validationSchema={
                            Yup.object().shape({
                                password: Yup.string().min(8, 'Password has to be at least 8 characters')
                                    .max(50, 'Password contains up to 50 characters')
                                    .matches(/^(?=.*[a-z])/, 'Password must contain at least one lowercase character')
                                    .matches(/^(?=.*[A-Z])/, 'Password must contain at least one uppercase character')
                                    .matches(/^(?=.*[@$!%*#?&]).*$/, 'Password must contain at least one special character')
                                    .matches(/\d/, 'Password must contain at least one number character')
                                    .required('Password is required'),
                                confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Confirm password not matched').required('Confirm password is required'),
                            })
                        }
                        onSubmit={async (values, { resetForm }) => {
                            try {
                                const res = await userApi.resetPassword(values.password, token);
                                await swal('Hola !', res.message, 'success', { timer: 2000 });
                                navigate('/login', { replace: true });
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
                                        className={classes.tittle}
                                    >
                                        New Password User
                                     </Typography>
                                </Box>
                                <TextField
                                    error={Boolean(touched.password && errors.password)}
                                    fullWidth
                                    helperText={touched.password && errors.password}
                                    label="Password"
                                    margin="normal"
                                    name="password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type={showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <VpnKeyIcon />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={(e) => setShowPassword(!showPassword)}
                                                    onMouseDown={(e) => {
                                                        e.preventDefault();
                                                    }}
                                                    edge="end"
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <TextField
                                    error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                                    fullWidth
                                    helperText={touched.confirmPassword && errors.confirmPassword}
                                    label="Confirm Password"
                                    margin="normal"
                                    name="confirmPassword"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={values.confirmPassword}
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockOpenIcon />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={(e) => setShowConfirmPassword(!showConfirmPassword)}
                                                    onMouseDown={(e) => {
                                                        e.preventDefault();
                                                    }}
                                                    edge="end"
                                                >
                                                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <Box my={2}>
                                    <Button
                                        color="primary"
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                    >
                                        Reset Password
                                    </Button>
                                    <div className={classes.divider}>
                                        <hr className={classes.solid} />
                                        <Typography
                                            align="center"
                                            color="textSecondary"
                                            variant="body1"
                                        >
                                            If successful, please login
                  </Typography>
                                        <hr className={classes.solid} />
                                    </div>
                                    <Box my={2}>
                                        <Button
                                            onClick={() => { navigate('/login') }}
                                            className={classes.signupButton}
                                            fullWidth
                                            variant="contained"
                                            color="primary">Login
                                    </Button>
                                    </Box>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Container>
            </Box>
        </PageTittle>
    );
};

export default RegisterView;
