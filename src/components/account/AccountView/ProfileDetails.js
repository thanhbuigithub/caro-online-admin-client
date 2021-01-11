import React, { useState, useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import UserContext from '../../../contexts/UserContext';
import swal from 'sweetalert';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  InputAdornment,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from "@material-ui/icons/Email";
import PersonIcon from "@material-ui/icons/Person";
const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  }
];

const useStyles = makeStyles((theme) => ({
  root: {},
  tittle: {
    background: 'linear-gradient(to left,rgba(116,235,213,0.6),rgba(159,172,230,0.6))',
    color: '#5850EC',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    fontFamily: 'ThirstyScriptRegular',
    fontSize: '3rem',
    textAlign: 'center',
  },
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { user, handleChangeProfile } = useContext(UserContext);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        email: user.email,
        userName: user.username,
        fullName: user.name,
      }}
      validationSchema={
        Yup.object().shape({
          email: Yup.string().email('Email must be valid').max(255).required('Email is required'),
          userName: Yup.string().max(255).required('User name is required'),
          fullName: Yup.string().max(255).required('Full name is required')
        })
      }
      onSubmit={(values, { resetForm }) => {
        swal({
          title: "Do you want to update information?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
          .then((willDelete) => {
            if (willDelete) {
              handleChangeProfile(values.fullName, values.email, values.userName);
              swal("Yeah! Your profile has been changed!", {
                icon: "success",
                buttons: false,
                timer: 1000,
              });
            } else {
              swal("Your profile not change!", { icon: "warning", timer: 1000, buttons: false, });
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
        handleReset,
        touched,
        isSubmitting,
        dirty,
        values
      }) => (
        <form
          onSubmit={handleSubmit}
          className={clsx(classes.root, className)}
          {...rest}
        >
          <Card>
            <CardHeader
              title="Profile"
              disableTypography
              className={classes.tittle}
            />
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  xs={12}
                >
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
                </Grid>
                <Grid
                  item
                  xs={12}
                >
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
                </Grid>
                <Grid
                  item
                  xs={12}
                >
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
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box
              display="flex"
              justifyContent="space-between"
              p={2}
            >
              <Button
                onClick={handleReset}
                color="primary"
                variant="contained"
                disabled={!dirty}
              >
                Reset
          </Button>
              <Button
                type="submit"
                color="primary"
                variant="contained"
              >
                Save
          </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
