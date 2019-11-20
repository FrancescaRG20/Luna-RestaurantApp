import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getSingleRestaurantAction } from "../../../store/actions/getSingleRestaurantAction";
import { getSingleRestaurantReviewsAction } from "../../../store/actions/getSingleRestaurantReviewsAction";
import HeadImage from "../../../Components/HeadImage";
import background from "../../../assets/temp-bg.jpg";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import laptop from "../../../assets/web.svg";
import location from "../../../assets/pin.svg";
import phone from "../../../assets/phone.svg";
import clock from "../../../assets/clock.svg";
import map from "../../../assets/temp_map.jpg";
import money from "../../../assets/money.svg";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "../../../Components/Button";

const useStyles = makeStyles(theme => ({
  shadowDiv: {
    height: "50%",
    width: "100vw",
    backgroundColor: "black",
    opacity: "0.3",
    marginLeft: -theme.spacing(4),
    zIndex: -1
  },
  typocontainer: {
    marginTop: "-15vh",
    position: "absolute",
    paddingLeft: "10vh"
  },
  headertypo: {
    zIndex: 3,
    color: "white"
  },
  mapContainer: {
    backgroundColor: "white",
    height: "35vh",
    width: "15vw",
    marginRight: theme.spacing(6),
    marginLeft: "auto",
    marginTop: "-17.5vh",
    zIndex: 1,
    position: "relative"
  },
  reviewStats: {
    display: "flex"
  },
  ratingDisplay: {
    marginRight: theme.spacing(1)
  },
  media: {
    height: "17.5vh"
  },
  icon: {
    marginRight: theme.spacing(1),
    width: theme.spacing(3)
  },
  spinnerContainer: {
    minHeight: "100vh",
    textAlign: "center",
    paddingTop: "40vh"
  },
  spinner: {
    width: "10vw"
  },
  openingHourContainer: {
    marginTop: "2vh",
    borderBottom: "solid 2px grey"
  },
  priceLevelContainer: {
    paddingTop: "1vh"
  }
}));

const RestaurantPage = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const [values, setValues] = useState({
    restaurant: null,
    restaurantReviews: null
  });
  useEffect(() => {
    dispatch(getSingleRestaurantAction(id)).then(restaurantData =>
      dispatch(getSingleRestaurantReviewsAction(id)).then(reviewData =>
        setValues({
          ...values,
          restaurant: restaurantData,
          restaurantReviews: reviewData
        })
      )
    );
  }, []);

  const handleWriteReviewClick = (e)=>{
    props.history.push(`/write-review/${id}`)
  }
  return (
    <>
      {values.restaurant !== null ? (
        <>
          <HeadImage height="40vh" image={background}>
            <div className={classes.shadowDiv}></div>
            <div className={classes.typocontainer}>
              <Typography variant="h4" className={classes.headertypo}>
                {values.restaurant.name}
              </Typography>
              <Typography variant="h6" className={classes.headertypo}>
                {values.restaurant.categories.map(category => category)}
              </Typography>
              <div className={classes.reviewStats}>
                <Rating
                  value={values.restaurant.review_avg_rating}
                  readOnly
                  className={classes.ratingDisplay}
                />
                <Typography variant="subtitle2" className={classes.headertypo}>
                  {values.restaurant.review_count} Reviews
                </Typography>
              </div>
            </div>
            <Card className={classes.mapContainer}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={map}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2">
                    <img src={location} className={classes.icon} />
                    {values.restaurant.street}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="h2">
                    <img src={phone} className={classes.icon} />
                    {values.restaurant.phone}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="h2">
                    <img src={laptop} className={classes.icon} />
                    {values.restaurant.website}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </HeadImage>
          <Container maxWidth="lg">
            <Grid container spacing={2}>
              <Grid xs="8"></Grid>
              <Grid xs="4">
                <div className={classes.openingHourContainer}>
                  <Typography gutterBottom variant="h6" component="h2">
                    <img src={clock} className={classes.icon} />
                    {values.restaurant.opening_hours}
                  </Typography>
                </div>
                <div className={classes.priceLevelContainer}>
                  <Typography gutterBottom variant="h6" component="h2">
                    <img src={money} className={classes.icon} />
                    Price Level: {values.restaurant.price_level}
                  </Typography>
                </div>
                <Grid container>
                  <Grid xs={6}>
                    <Button value="WRITE A REVIEW" click={handleWriteReviewClick}/>
                  </Grid>
                  <Grid xs={6}>
                    <Button value="EDIT DATA" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </>
      ) : (
        <Container className={classes.spinnerContainer}>
          <CircularProgress className={classes.spinner} />
        </Container>
      )}
    </>
  );
};

export default RestaurantPage;
