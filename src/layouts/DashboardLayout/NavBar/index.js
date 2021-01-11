import React, { useEffect, useContext, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';

import NavItem from './NavItem';
import UserContext from '../../../contexts/UserContext';

import PeopleIcon from '@material-ui/icons/People';
import HistoryIcon from '@material-ui/icons/History';

const items = [
  {
    href: '/users',
    icon: PeopleIcon,
    title: 'Users'
  },
  {
    href: '/matchs',
    icon: HistoryIcon,
    title: 'Matchs'
  },
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  },
  button: {
    textAlign: 'center',
    width: '90%',
    margin: `32px auto`
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const { user, avatar } = useContext(UserContext);
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          to="/profile"
          src={avatar || "/static/unknown_avatar.jpg"}
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.isAdmin ? 'Admin' : 'User'}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item, index) =>
          (
            <NavItem
              key={index}
              href={item.href}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box my={2} className={classes.button}>
        <Button
          onClick={() => { }}
          color="primary"
          fullWidth
          size="large"
          variant="contained"
        >
          Lịch sử trận đấu
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
  data: PropTypes.object
};

NavBar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false,
  data: null
};

export default NavBar;
