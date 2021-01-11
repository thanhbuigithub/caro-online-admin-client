import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
  Snackbar,
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
    borderRadius: '5px',

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
  link: {
    color: '#145cf2',
    fontWeight: '700',
    '&:hover': {
      textDecoration: 'none',
    }
  }
}));



const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
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
              email: '',
              userName: '',
              fullName: '',
              password: '',
              confirmPassword: '',
              policy: true
            }}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Email must be valid').max(255).required('Email is required'),
                userName: Yup.string().max(255).required('User name is required'),
                fullName: Yup.string().max(255).required('Full name is required'),
                password: Yup.string().min(8, 'Password has to be at least 8 characters')
                  .max(50, 'Password contains up to 50 characters')
                  .matches(/^(?=.*[a-z])/, 'Password must contain at least one lowercase character')
                  .matches(/^(?=.*[A-Z])/, 'Password must contain at least one uppercase character')
                  .matches(/^(?=.*[@$!%*#?&]).*$/, 'Password must contain at least one special character')
                  .matches(/\d/, 'Password must contain at least one number character')
                  .required('Password is required'),
                confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Confirm password not matched').required('Confirm password is required'),
                policy: Yup.boolean().oneOf([true], 'This field must be checked')
              })
            }
            onSubmit={async (values, { resetForm }) => {
              try {
                const { email, userName, fullName, password } = values;
                const fetchUser = await userApi.register(email, userName, fullName, password);
                await swal({
                  title: "Registering...",
                  text: "Please wait",
                  icon: "/static/loading.gif",
                  button: false,
                  timer: 1000,
                  closeOnClickOutside: false,
                  closeOnEsc: false
                })
                await swal({
                  title: "Info !",
                  icon: "info",
                  text: fetchUser.message,
                  button: false,
                  timer: 3000,
                })
                resetForm();
                // swal('Info !', fetchUser, 'info', { timer: 2000 });

                // resetForm();
                // navigate('/login', { replace: true });
              } catch (err) {
                if (err.response) {
                  console.log(err.response);
                  swal("Opps!", err.response.data, "error", {
                    buttons: false,
                    timer: 2000,
                  });
                } else {
                  swal("Opps!", "Server is closed", "error", {
                    buttons: false,
                    timer: 2000,
                  });
                }
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
                    Create new account
                  </Typography>

                </Box>
                <TextField
                  error={Boolean(touched.userName && errors.userName)}
                  fullWidth
                  helperText={touched.userName && errors.userName}
                  label="User Name"
                  margin="normal"
                  name="userName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.userName}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  error={Boolean(touched.fullName && errors.fullName)}
                  fullWidth
                  helperText={touched.fullName && errors.fullName}
                  label="Full name"
                  margin="normal"
                  name="fullName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.fullName}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
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
                <Box
                  alignItems="center"
                  display="flex"
                  ml={-1}
                >
                  <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    I have read the
                    {' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error style={{ margin: '0 14px' }}>
                    {errors.policy}
                  </FormHelperText>
                )}
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up now
                  </Button>
                </Box>
                <Box mt={3}
                  textAlign="center">
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    Have an account?
                  {' '}
                    <Link
                      component={RouterLink}
                      to="/login"
                      variant="h5"
                      className={classes.link}
                    >
                      Sign in
                  </Link>
                  </Typography>
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
