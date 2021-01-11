import React, { useState, useEffect, useContext } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import NavBar from "./NavBar/index";
import TopBar from "./TopBar";

import userApi from "../../api/userApi";
import UserContext from "../../contexts/UserContext";
import auth from "../../components/common/router/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    paddingTop: 64,
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 256,
    },
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "auto",
  },
}));

const DashboardLayout = () => {
  const classes = useStyles();
  const location = useLocation();
  let history = useNavigate();
  const isHomePage = location.pathname === "/" ||
    location.pathname === "/users" || location.pathname === "/matchs";
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const {
    handleSaveUser,
    handleIsUploadAvatar,
    isUploadAvatar,
    _id,
    avatar,
    handleSaveAvatar,
    user,
  } = useContext(UserContext);
  const match = useParams();



  useEffect(() => {
    const getAvatar = async () => {
      try {
        const id = auth.getCurrentUser()._id;
        const fetchUser = await userApi.getAvatar(id);
        if (fetchUser.success) {
          // handleSaveAvatar(fetchUser.path);
          handleSaveAvatar(fetchUser.pathId);
          console.log("Update Avatar First");
        }
      } catch (err) {
        console.log("Avatar not updated");
      }
    };
    getAvatar();
  }, []);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const id = auth.getCurrentUser()._id;
        const fetchUser = await userApi.getAvatar(id);
        if (fetchUser.success) {
          // handleSaveAvatar(fetchUser.path);
          handleSaveAvatar(fetchUser.pathId);
          console.log("Update Avatar Later");
          handleIsUploadAvatar(false);
        }
      } catch (err) {
        console.log("Error: ", err.response);
      }
    };
    if (isUploadAvatar) {
      fetchAvatar();
    }
  });

  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      {isHomePage ? (
        <>
          <NavBar
            onMobileClose={() => setMobileNavOpen(false)}
            openMobile={isMobileNavOpen}
          />
          <div className={classes.wrapper}>
            <div className={classes.contentContainer}>
              <div className={classes.content}>
                <Outlet />
              </div>
            </div>
          </div>
        </>
      ) : (
          <div
            className={classes.contentContainer}
            style={{ paddingTop: "64px" }}
          >
            <div className={classes.content}>
              <Outlet />
            </div>
          </div>
        )}
    </div>
  );
};

export default DashboardLayout;
