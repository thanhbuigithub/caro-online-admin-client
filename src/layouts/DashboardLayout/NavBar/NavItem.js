import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Button,
  ListItem,
  makeStyles,
  withStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  item: {
    display: 'flex',
    marginBottom: theme.spacing(1),
  },
  button: {
    color: theme.palette.text.secondary,
    // margin:`-${theme.spacing(1)}`,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: 'flex-start',
    padding: '10px 8px',
    width: '100%',
    '&:hover': {
      border: 'none',
    }
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  title: {
    marginRight: 'auto'
  },
  active: {
    color: '#9c27b0',
    borderBottom: '2px solid #9c27b0',
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium
    },
    '& $icon': {
      color: '#9c27b0',
    }
  }
}));

const StyledListItem = withStyles((theme) => ({
  root: {
    paddingTop: 0,
    paddingBottom: 0,
    "&:hover": {
      borderRadius: '5px',
      backgroundColor: '#00acc1',
      "& .MuiButtonBase-root, & .MuiSvgIcon-root": {
        color: theme.palette.common.white
      }
    }
  }
}))(ListItem);

const NavItem = ({
  className,
  href,
  icon: Icon,
  title,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <StyledListItem
      className={clsx(classes.item, className)}
      disableGutters
      {...rest}
    >
      <Button
        activeClassName={classes.active}
        className={classes.button}
        component={RouterLink}
        to={href}
      >
        {Icon && (
          <Icon
            className={classes.icon}
            size="20"
          />
        )}
        <span className={classes.title}>
          {title}
        </span>
      </Button>
    </StyledListItem>
  );
};

NavItem.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string
};

export default NavItem;
