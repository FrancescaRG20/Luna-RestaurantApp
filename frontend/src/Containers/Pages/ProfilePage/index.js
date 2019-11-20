import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import HeadImage from "../../../Components/HeadImage";
import Zurich from "../../../assets/zurich.jpg";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import ProfilePic from "../../../assets/Placeholder.png";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Navbar from "./Navbar";
import ProfileSubRoutes from "./SubRoutes";
import "./style.css";
import { staticUrl } from "../../../store/constants";

const useStyles = makeStyles(theme => ({
  shadowDiv: {
    height: '20%',
    width: '100vw',
    backgroundColor: 'black',
    opacity: '0.3',
    zIndex: -1,
    position: 'absolute'
  },
  root: {
    paddingTop: "7vh"
  },
  right: {
    marginTop: "13vh",
    backgroundColor: "#f8f8f8",
    padding: theme.spacing(1)
  },
  grid: {},
  centerTop: {
    minHeight: "13vh",
    color: "white"
  },
  center: {
    backgroundColor: "white",
    padding: theme.spacing(1)
  },
  navbar: {
    display: "flex",
    flexDirection: "column"
  },
  title: {
    marginTop: 0
  }
}));

const ProfilePage = props => {
  const classes = useStyles();
  const gridRight = clsx(classes.right, classes.grid);
  const gridCenterTop = clsx(classes.centerTop, classes.grid);
  const gridCenter = clsx(classes.center, classes.grid);
  const [value, setValue] = useState({
    user: {},
    numReviews: undefined,
    numComments: undefined
  });
  const tempState = useSelector(state => state);

  useEffect(() => {
    setValue({
      user: tempState.userLoginReducer.user,
      numReviews: tempState.userReviewsReducer.reviews.length,
      numComments: tempState.userCommentsReducer.comments.length
    });
    console.log("tempstate", tempState);
  }, [tempState]);

  return (
    <>
      <HeadImage image={Zurich} height="20vh" position="absolute" />
      <div className={classes.shadowDiv}>
      </div>
      <Container maxWidth="lg" className={classes.root}>
        <Grid container>
          <Grid item xs="3">
            {value.user.profile !== undefined ? (
              <img src={`${staticUrl}${value.user.profile[0].avatar}`} />
            ) : null}
            <Navbar style={classes.navbar} />
          </Grid>
          <Grid item xs="6">
            <div className={gridCenterTop}>
              <h1 className={classes.title}>
                {value.user.first_name} {value.user.last_name}
              </h1>
              <h3 className="subtitles">{value.numReviews} Reviews</h3>
              <h3 className="subtitles">{value.numComments} Comments</h3>
            </div>
            <div className={gridCenter}>
              <ProfileSubRoutes />
            </div>
          </Grid>
          <Grid item xs="3" className={gridRight}>
            <div>
              <h3>
                {value.user !== null ? (
                  <h3 className="profile-about">
                    {" "}
                    ABOUT {value.user.first_name}
                  </h3>
                ) : null}
              </h3>
              <h4>Luna Member Since</h4>
              <p>
                {" "}
                {value.user !== null ? (
                  <p>
                    {value.user.profile ? (
                      <Moment format="D MMM YYYY" withTitle>
                        {value.user.profile[0].joined}
                      </Moment>
                    ) : (
                      ""
                    )}
                  </p>
                ) : null}
              </p>
              <h4>Things I Love</h4>
              <p>
                {value.user !== null ? (
                  <p>
                    {value.user.profile
                      ? value.user.profile[0].things_I_love
                      : ""}
                  </p>
                ) : null}
              </p>
              <h4>Description</h4>
              <p>
                {value.user !== null ? (
                  <p>
                    {value.user.profile
                      ? value.user.profile[0].description
                      : ""}
                  </p>
                ) : null}
              </p>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProfilePage;
