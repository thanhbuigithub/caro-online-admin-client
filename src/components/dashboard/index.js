import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useStyles from "./muiStyle";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import UserContext from "../../contexts/UserContext";
import Box from "@material-ui/core/Box";
import PageTittle from "../PageTittle";

function Home() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { listUserOnline, setListUserOnline } = useContext(UserContext);


  return (
    <PageTittle className={classes.root} title="DashBoard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={4} sm={6} xl={3} xs={12}>
            111
          </Grid>
          <Grid item lg={4} sm={6} xl={3} xs={12}>
            222
          </Grid>
          <Grid item lg={4} sm={6} xl={3} xs={12}>
            333
          </Grid>
          <Box component="span" m={4} width="100%" />
          <Grid container spacing={3} style={{ margin: 0 }}>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              444
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              555
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              666
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </PageTittle>
  );
}

export default Home;
