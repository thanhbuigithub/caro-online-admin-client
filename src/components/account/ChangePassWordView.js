import React, { useState, useEffect, useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import UserContext from '../../contexts/UserContext';
import swal from 'sweetalert';
import userApi from "../../api/userApi";
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
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    // const { handleChangePassword, error, handleResetError } = useContext(UserContext);


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
                            oldPassword: '',
                            password: '',
                            confirmPassword: '',
                        }}
                        validationSchema={
                            Yup.object().shape({
                                oldPassword: Yup.string().required('Old Password is required'),
                                password: Yup.string().min(8, 'Password has to be at least 8 characters')
                                    .max(50, 'Password contains up to 50 characters')
                                    .matches(/^(?=.*[a-z])/, 'Password must contain at least one lowercase character')
                                    .matches(/^(?=.*[A-Z])/, 'Password must contain at least one uppercase character')
                                    .matches(/^(?=.*[@$!%*#?&]).*$/, 'Password must contain at least one special character')
                                    .matches(/\d/, 'Password must contain at least one number character')
                                    .required('New Password is required'),
                                confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Confirm password not matched').required('Confirm new password is required'),
                            })
                        }
                        onSubmit={(values, { resetForm }) => {
                            swal({
                                title: "Do you want to change password?",
                                icon: "warning",
                                buttons: true,
                                dangerMode: true,
                            })
                                .then(async (willDelete) => {
                                    if (willDelete) {
                                        try {
                                            await userApi.changePassword(values.oldPassword, values.password);

                                            await swal("Yeah! Your password has been changed!", {
                                                icon: "success",
                                                buttons: false,
                                                timer: 1500,
                                            });
                                            resetForm();
                                            navigate('/');

                                        } catch (err) {

                                            swal({
                                                icon: "error",
                                                title: "Opps !",
                                                text: err.response.data,
                                                buttons: false,
                                                timer: 1500,
                                            });
                                            resetForm();
                                        }
                                    } else {
                                        swal("Your password not change!", { icon: "warning", timer: 1000, buttons: false, });
                                        resetForm();
                                    }
                                });

                        }}
                    >
                        {({
                            errors,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            touched,
                            values
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Box textAlign="center" style={{ margin: '-2em -1.5em 0.5em -1.5em' }}>
                                    <Typography
                                        color="textPrimary"
                                        className={classes.tittle}
                                    >
                                        Change Password User
                                     </Typography>
                                </Box>
                                <TextField
                                    error={Boolean(touched.oldPassword && errors.oldPassword)}
                                    fullWidth
                                    helperText={touched.oldPassword && errors.oldPassword}
                                    label="Old Password"
                                    margin="normal"
                                    name="oldPassword"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type={showOldPassword ? 'text' : 'password'}
                                    value={values.oldPassword}
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
                                                    onClick={(e) => setShowOldPassword(!showOldPassword)}
                                                    onMouseDown={(e) => {
                                                        e.preventDefault();
                                                    }}
                                                    edge="end"
                                                >
                                                    {showOldPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
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
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                    >
                                        Change Password
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

export default RegisterView;
