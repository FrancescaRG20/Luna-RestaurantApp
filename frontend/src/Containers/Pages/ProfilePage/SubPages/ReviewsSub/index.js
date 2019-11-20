import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserReviewsAction } from "../../../../../store/actions/getUserReviewsAction";
import SingleReview from "../../../../../Components/SingleReview";

const ReviewsSubPage = props => {
  const dispatch = useDispatch();
  const reducerId = useSelector(
    ({ userLoginReducer }) => userLoginReducer.user
  );

  const [value, setValue] = useState({ reviews: undefined });

  useEffect(() => {
    console.log("reducerId", reducerId);
    // setValue({...value, id: tempState})
    if (reducerId !== null) {
      dispatch(getUserReviewsAction(reducerId.id)).then(data =>
        setValue({ ...value, reviews: data })
      );

      console.log("userReview", value.reviews);
    }
  }, []);
  console.log('xxxxx', value.reviews)
  return (
    <>
      <div className="comments-reviews--wrapper">
        <h1 className="profile-main-title">REVIEWS</h1>
        <div>
          {value.reviews ? (
            value.reviews.map(singleReview => {
              return (
                <div className="single-comment-review-wrapper">
                  {" "}
                  <SingleReview
                    key={singleReview.id}
                    singleReview={singleReview}
                  />
                </div>
              );
            })
          ) : (
            <p>loading</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ReviewsSubPage;
