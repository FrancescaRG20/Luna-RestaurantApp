import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCommentsAction } from "../../../../../store/actions/getUserCommentsAction";
import SingleComment from "../../../../../Components/SingleComment";
import "./style.css"

const CommentsSubPage = props => {
  const dispatch = useDispatch();
  const reducerId = useSelector(
    ({ userLoginReducer }) => userLoginReducer.user
  );

  const [value, setValue] = useState({ comments: undefined });

  useEffect(() => {
    console.log("Comments reducerId", reducerId);
    // setValue({...value, id: tempState})
    if (reducerId !== null) {
      dispatch(getUserCommentsAction(reducerId.id)).then(data =>
        setValue({ ...value, comments: data })
      );

      console.log("userComments", value.comments);
    }
  }, []);

  return (
    <>
      <div className="comments-reviews--wrapper">
        <h1 className="profile-main-title">COMMENTS</h1>
        <div>
          {value.comments ? (
            value.comments.map(singleComment => {
              return (
                <div className="single-comment-review-wrapper">
                  {" "}
                  <SingleComment
                    key={singleComment.id}
                    singleComment={singleComment}
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

export default CommentsSubPage;
