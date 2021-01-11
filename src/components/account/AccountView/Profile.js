import React, { useContext, useState, createRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import UserContext from '../../../contexts/UserContext';
import EventIcon from '@material-ui/icons/Event';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import moment from 'moment';
import userApi from "../../../api/userApi";
import swal from 'sweetalert';
import {
  Avatar,
  Box,
  Button,
  Grid,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';

// const user = {
//   avatar: '/static/logo.svg',
//   city: 'Los Angeles',
//   country: 'USA',
//   jobTitle: 'Senior Developer',
//   name: 'Katarina Smith',
//   timezone: 'GTM-7'
// };

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  }
}));

const Profile = ({ className, ...rest }) => {
  const classes = useStyles();
  const inputFileRef = createRef(null);
  const { user, avatar, isUploadAvatar, handleIsUploadAvatar, handleSaveAvatar } = useContext(UserContext);
  const date = new Date(user.date);
  const dateText = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
  const timeText = moment(date).format('HH:mm:ss');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isUpload, setIsUpload] = useState(false);


  const handleResetImage = () => {
    URL.revokeObjectURL(selectedFile);
    inputFileRef.current.value = null;
  };



  const handleSetImage = (newImage) => {
    if (selectedFile) {
      handleResetImage();
    }
    else {
      setSelectedFile(newImage);
    }

  }

  const handleChangeImage = (event) => {
    event.preventDefault();
    const newImage = event.target?.files?.[0];
    if (newImage) {
      setIsUpload(true);
      handleSetImage(URL.createObjectURL(newImage));
      setUploadedImage(newImage);
    }
  }
  const handleUploadImage = async () => {
    if (selectedFile) {
      let formData = new FormData();
      formData.append('caption', user._id);
      formData.append('file', uploadedImage);
      // const object = {};
      // formData.forEach((value, key) => object[key] = value);
      // const data = JSON.stringify(object);
      // console.log(object);
      try {
        const uploadImage = await userApi.uploadAvatar(formData);
        handleSaveAvatar(uploadImage.image.filename);
        setIsUpload(false);
        handleIsUploadAvatar(true);
        await swal("Yeah! Your avatar has been changed!", {
          icon: "success",
          buttons: false,
          timer: 1500,
        });
      } catch (err) {
        console.log(err.response)
      }

    }
  }
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            variant="circle"
            className={classes.avatar}
            src={selectedFile || avatar || '/static/unknown_avatar.jpg'}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {user.name}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {user.isAdmin ? 'Admin' : 'User'}
          </Typography>
          <Grid container justify="space-between" >
            <Grid item xs={12} md={6} sm={6} >
              <Box display="flex">
                <EventIcon color='secondary' />
                <Typography
                  color="textSecondary"
                  variant="body1"
                  component="span"
                  style={{ marginLeft: '5px' }}
                >
                  Date Join
              </Typography>
              </Box>
              <Typography
                className={classes.dateText}
                color="textSecondary"
                variant="body1"
                style={{ paddingLeft: '29px' }}
              >
                {dateText}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sm={6}>
              <Box display="flex" justifyContent="flex-end">
                <EventIcon color='secondary' />
                <Typography
                  color="textSecondary"
                  variant="body1"
                  component="span"
                  style={{ marginLeft: '5px' }}
                >
                  Time Join
              </Typography>
              </Box>
              <Typography
                className={classes.dateText}
                color="textSecondary"
                variant="body1"
                style={{ textAlign: 'end' }}
              >

                {timeText}
                {/* {`${moment().format('hh:mm A')} ${user.date}`} */}
              </Typography>

            </Grid>
          </Grid>

        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        {/* <Button
          color="primary"
          fullWidth
          variant="text"
        >
          Upload picture

        </Button> */}
        {isUpload ? (<Button
          fullWidth
          onClick={handleUploadImage}
          style={{ display: 'hidden' }}
          variant="contained"
          component="span"
          color="secondary"
          startIcon={<CloudUploadIcon />}
        >
          Submit file
        </Button>) : (
            <>
              <input
                // accept="image/*"
                ref={inputFileRef}
                accept=".png, .jpg, .jpeg, .svg"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={handleChangeImage}
              />
              <label htmlFor="raised-button-file" style={{ width: '100%' }}>
                <Button
                  variant="contained"
                  component="span"
                  color="secondary"
                  onClick={handleUploadImage}
                  fullWidth>
                  Upload picture
                   </Button>
              </label>
            </>
          )}

      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
