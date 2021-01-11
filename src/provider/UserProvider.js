import React from "react";
import { useState } from "react";
import UserContext from "../contexts/UserContext";
import userApi from "../api/userApi";

export default (props) => {
  const [listUserOnline, setListUserOnline] = useState([]);
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

  const { _id, name, username, email, date, isAdmin } = user;

  const handleIsUploadAvatar = (value) => {
    setIsUploadAvatar(value);
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
  return (
    <UserContext.Provider
      value={{
        listUserOnline,
        user,
        error,
        isUploadAvatar,
        _id,
        avatar,
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
