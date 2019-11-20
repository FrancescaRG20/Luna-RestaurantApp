import React, { useEffect, useState } from "react";
import GridDisplay from "../../../../Components/GridDisplay";
import DisplayCard from "../../../../Components/GridDisplay/DisplayCard";
import Rating from "@material-ui/lab/Rating";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { getAllReviewsAction } from "../../../../store/actions/getAllReviewsAction";
import Button from '../../../../Components/Button'
import { likeReviewAction } from "../../../../store/actions/likeReviewAction";

const ReviewsPage = props => {
  const [liked, setLiked] = useState(false)
  const [reviews, setReviews] = useState([])
  const [authenticated, setAuthenticated] = useState(false)
  const dispatch = useDispatch();
  const classes = makeStyles(theme => ({
    fab: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }))();
  let reviewsResults = useSelector(
    ({ searchReducer }) => searchReducer.reviews
  );
  let allReviews = useSelector(
    ({ allItemsReducer }) => allItemsReducer.reviews
  );
  let userState = useSelector(({userLoginReducer})=>userLoginReducer)
  const handleLike = reviewId => {
    dispatch(likeReviewAction(reviewId)).then(data=>setLiked(data))
  }
  useEffect(() => {
    if (!reviewsResults) {
      dispatch(getAllReviewsAction());
      setReviews(allReviews);
    } else {
      setReviews(reviewsResults);
    }
    setAuthenticated(userState.authenticated)
  }, [reviewsResults, reviews]);

  return (
    <GridDisplay>
      {reviews.map(review => (
        <DisplayCard key={review.id}>
          <h3>
            {review.author.first_name
              ? review.author.first_name + " " + review.author.last_name
              : review.author.username}
          </h3>
          <h5>{review.restaurant.name}</h5>
          <div>
            <Rating value={review.rating} readOnly />
            <div>{review.content}</div>
            {authenticated 
              ? <Button value='Like' click={() => handleLike(review)}/>
              : null}
            {review.comments.length ? (
              <>
                <h4>Latest Comments ({review.comments.length})</h4>
                {review.comments.map(comment => (
                  <div>
                    <h6>
                      {comment.author.first_name
                        ? comment.author.first_name +
                          " " +
                          comment.author.last_name
                        : comment.author.username}
                    </h6>
                    <p>{comment.content}</p>
                  </div>
                ))}
              </>
            ) : null}
          </div>
        </DisplayCard>
      ))}
    </GridDisplay>
  );
};

export default ReviewsPage;
