import React from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import "./style.css";

const SingleComment = props => {
  console.log("in singlecomment", props);
  return (
    <>
      <div className="comment-review-title-created-wrapper">
        <div className="comment-review-title">
          Review: {props.singleComment.id}
        </div>
        <div className="comment-created">
          {" "}
          <Moment format="DD.MM.YYYY HH:mm">
            {props.singleComment.modified}
          </Moment>
        </div>
      </div>
      <div className="comment-review-content">{props.singleComment.content}</div>
    </>
  );
};

export default connect()(SingleComment);
