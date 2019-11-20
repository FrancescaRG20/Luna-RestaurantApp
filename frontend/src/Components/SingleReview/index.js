import React from "react";
import { connect } from "react-redux";
import Rating from "@material-ui/lab/Rating";

const SingleReview = props => {
  console.log("in singlereview", props);
  return (
    <>
      <div className="comment-review-title-created-wrapper">
        <div className="comment-review-title">
          {props.singleReview.restaurant.name}
        </div>
      </div>
      <div className="comment-review-content">
        <Rating value={props.singleReview.rating} readOnly />
        <div>{props.singleReview.content}</div>
      </div>

    </>
  );
};

export default connect()(SingleReview);
