import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSingleRestaurantAction } from "../../../../store/actions/getSingleRestaurantAction";
import HeadImage from "../../../../Components/HeadImage";
import background from "../../../../assets/temp-bg.jpg";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Button from "../../../../Components/Button";
import {newReviewAction} from '../../../../store/actions/newReviewAction'

const useStyles = makeStyles(theme => ({
  shadowDiv: {
    height: "100%",
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
  makeReviewContainer: {},
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%'
  },
  ratingContainer:{
    display:'flex',
    alignItems:'center',
    padding: theme.spacing(2),
    marginTop: theme.spacing(2)
    

  },
  rating:{
    marginRight: theme.spacing(2)
  },
  submitButton:{
    marginRight:0,
    marginLeft: 'auto'
  }
}));
const WriteRestaurantReview = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const [values, setValues] = useState({
    restaurant: null,
    reviewValue: undefined,
    reviewText: ''
  });
  useEffect(() => {
    dispatch(getSingleRestaurantAction(id)).then(restaurantData =>
      setValues({
        ...values,
        restaurant: restaurantData
      })
    );
  }, []);
  const handleRatingChange = (event, newValue) => {
    setValues({ ...values, reviewValue: newValue });
  };
  const handleReviewChange = (e)=>{
    console.log(e)
    setValues({...values, reviewText: e.target.value})
  }
  const handleSubmit=(e)=>{
    dispatch(newReviewAction({id: id, body:{rating: values.reviewValue, content: values.reviewText}}))
  }
  return (
    <>
      {values.restaurant !== null ? (
        <>
          <HeadImage height="20vh" image={background}>
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
          </HeadImage>
          <Container maxWidth="lg" className={classes.makeReviewContainer}>
          <div className={classes.ratingContainer}>
          <Rating
          name="simple-controlled"
          value={values.reviewValue}
          onChange={handleRatingChange}
          size="large"
          className={classes.rating}
          />
          <Typography variant='h6' >
          Select your rating display</Typography>
          </div>
          <TextField
          id="outlined-multiline-static"
            // label="Review"
            multiline
            rows="10"
            className={classes.textField}
            placeholder="Your review helps others learn about great local businesses.
             Please don't review this business if you received a freebie for writing this review, or if you're connected in any way to the owner or employees."
            margin="normal"
            variant="outlined"
            value={values.reviewText}
            onChange={handleReviewChange}
          />
          <Button value='Submit' className={classes.submitButton} click={handleSubmit}/>
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

export default WriteRestaurantReview;
