import React, { useEffect, useState, useContext } from 'react';
import { Link as RouterLink, useNavigate, Navigate, useParams, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles,
  InputAdornment
} from '@material-ui/core';
import FacebookIcon from "@material-ui/icons/Facebook";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import GoogleIcon from '../../library/icon/Google';
import PageTittle from '../PageTittle';
import LogoAuth from '../LogoAuth';
import loginBackGroundLeft from '../../library/images/loginBackgroundLeft.svg';
import loginBackGroundRight from '../../library/images/loginBackgroundRight.svg';
import auth from "../common/router/auth";
import userApi from "../../api/userApi";
import CloseIcon from '@material-ui/icons/Close';
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
    color: '#5850EC',
    background: 'linear-gradient(to left,rgba(116,235,213,0.6),rgba(159,172,230,0.6))',
    fontFamily: 'ThirstyScriptRegular',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
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
  }
}));



const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();

  function useQuery() {
    return new URLSearchParams(location.search);
  }
  let query = useQuery();

  useEffect(() => {

    const isSocialLogin = async () => {
      try {
        const token = query.get('token');
        if (token) {
          auth.setAccessToken(token, () => {
            navigate('/', { replace: true });
          })
        }
      } catch (error) {
        console.log(error);
      }
    }
    isSocialLogin();
  }, [])
  return (
    <PageTittle
      className={classes.root}
      title="Login"
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
              userName: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              userName: Yup.string().required('User name is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={async (values, { resetForm }) => {
              try {
                const { userName, password } = values;
                const res = await userApi.login(userName, password);
                resetForm();
                await swal({
                  title: "Logging...",
                  text: "Please wait",
                  icon: "/static/loading.gif",
                  button: false,
                  timer: 1000,
                  closeOnClickOutside: false,
                  closeOnEsc: false
                })
                auth.setAccessToken(res, () => {
                  navigate('/', { replace: true });
                });
              } catch (err) {
                if (err.response) {
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
                <Box textAlign="center" style={{ margin: '-2em -1.5em 0em -1.5em' }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                    className={classes.tittle}
                  >
                    Log in to Admin
                  </Typography>
                  <LogoAuth />
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
                <Box my={2} textAlign="end">
                  <Link
                    component={RouterLink}
                    to="/forgot_password"
                    variant="h5"
                    className={classes.link}
                  >
                    Forgot password?
                  </Link>
                </Box>
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in
                  </Button>
                </Box>
                <Box
                  mt={3}
                  mb={1}
                >
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
                </Box>
                <Box mt={3}
                  textAlign="center">
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    Create Admin Account?
                  {' '}
                    <Link
                      component={RouterLink}
                      to="/register"
                      variant="h5"
                      className={classes.link}
                    >
                      Register
                  </Link>
                  </Typography>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>

    </PageTittle >
  );
};

export default LoginView;
