import React from "react";
import { useState } from "react";
import UserContext from "../contexts/UserContext";
import userApi from "../api/userApi";

export default (props) => {
  const [listUserOnline, setListUserOnline] = useState([]);
  const [listUsers, setListUsers] = useState([]);
  const [listUsersTemp, setListUsersTemp] = useState([]);
  const [user, setUser] = useState({
    _id: "",
    name: "",
    username: "",
    email: "",
    date: new Date(),
    isAdmin: false,
  });
  const [error, setError] = useState("");
  const [isUploadAvatar, setIsUploadAvatar] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [isChanged, setIsChanged] = useState(false);

  const { _id, name, username, email, date, isAdmin } = user;

  const handleIsUploadAvatar = (value) => {
    setIsUploadAvatar(value);
  };

  const handleSetListUsers = (value) => {
    setListUsers(value);
    setListUsersTemp(value);
  };
  const handleIsChanged = (value) => {
    setIsChanged(value)
  }
  const handleDisableAccess = async (id) => {
    try {
      const fetch = await userApi.disableAccess(id);
      const index = listUsers.findIndex(item => item._id === fetch._id);
      setListUsers(listUsers.splice(index, 1, fetch));
      setIsChanged(!isChanged);
      console.log('Disable')
    } catch (error) {
      console.log('ERROR Disable')
    }
  };

  const handleEnableAccess = async (id) => {
    try {
      const fetch = await userApi.enableAccess(id);
      const index = listUsers.findIndex(item => item._id === fetch._id);
      setListUsers(listUsers.splice(index, 1, fetch));
      setIsChanged(!isChanged);
      console.log('Enable')
    } catch (error) {
      console.log('ERROR Enable')
    }
  };
  const handleResetError = () => {
    setError("");
  };

  const handleSaveUser = (fetchUser) => {
    setUser({
      ...user,
      _id: fetchUser._id,
      name: fetchUser.name,
      username: fetchUser.username,
      email: fetchUser.email,
      isAdmin: fetchUser.isAdmin,
      date: fetchUser.date,
    });
  };

  const handleSaveAvatar = (avatarUser) => {
    setAvatar(
      `${process.env.REACT_APP_ENDPOINT}/api/image/avatar/${avatarUser}`
    );
  };

  const handleChangeProfile = async (newName, newEmail, newUserName) => {
    try {
      const userUpdate = await userApi.updateProfile(
        newName,
        newEmail,
        newUserName
      );
      setUser({
        name: userUpdate.name,
        username: userUpdate.username,
        email: userUpdate.email,
        isAdmin: userUpdate.isAdmin,
        date: userUpdate.date,
      });
    } catch (err) {
      console.log(err.response.data);
      // console.log("header: Failed to update profile: ", err);
      // if (!err.response) setError("Server is closed");
      // else setError(err.response.data);
    }
  };

  const handleChangePassword = async (oldPassword, newPassword) => {
    try {
      await userApi.changePassword(oldPassword, newPassword);
    } catch (err) {
      setError(err.response.data);
      // console.log("header: Failed to update profile: ", err);
      // if (!err.response) setError("Server is closed");
      // else setError(err.response.data);
    }
  };

  const handleSearchText = (text) => {
    const result = listUsers.filter(item => item.username.includes(text) || item.email.includes(text));
    setListUsers(result);
  }
  return (
    <UserContext.Provider
      value={{
        listUserOnline,
        user,
        error,
        isUploadAvatar,
        _id,
        avatar,
        listUsers,
        isChanged,
        listUsersTemp,
        setListUsers,
        setListUsersTemp,
        handleIsChanged,
        handleSearchText,
        handleDisableAccess,
        handleEnableAccess,
        handleSetListUsers,
        handleSaveAvatar,
        handleIsUploadAvatar,
        handleResetError,
        handleSaveUser,
        setListUserOnline,
        handleChangeProfile,
        handleChangePassword,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
