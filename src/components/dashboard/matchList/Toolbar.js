import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import UserContext from "../../../contexts/UserContext";
const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3)
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();
  const [text, setText] = useState('');
  const {
    handleSearchText,
    handleSetListUsers,
    listUsersTemp
  } = useContext(UserContext);

  useEffect(() => {
    const search = async () => {
      await handleSetListUsers(listUsersTemp);
    }
    if (text.length === 0) {
      search();
    }
  })

  // useEffect(() => {
  //   const search = async () => {
  //     await handleSetListUsers(listUsersTemp);
  //   }
  //   if (text.length === 0) {
  //     search();
  //   }
  // })
  const handleChange = (event) => {
    setText(event.target.value);
    handleSearchText(event.target.value);
  }
  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box >
        <Card>
          <CardContent>
            <Box maxWidth={500} display="flex">
              <TextField
                fullWidth
                type="search"
                variant="outlined"
                onChange={handleChange}
                value={text}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search name, email"
                variant="outlined"
              />
              {/* <Button
                onClick={() => { alert(text) }}
                style={{ height: '90%', margin: 'auto 10px' }}
                variant="contained"
                color="primary"
                component="span">
                Search
        </Button> */}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
