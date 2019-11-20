import { baseUrl } from "../constants";

export const getComments = comments => ({
  type: "GET_USER_COMMENTS",
  payload: comments
});

export const getUserCommentsAction = id => async (dispatch, getState) => {
  console.log("Get comments action");
  let { token } = getState().userLoginReducer;
  console.log(token);
  if (!token) {
    token = localStorage.getItem("token");
  }

  const headers = new Headers({
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`
  });

  const config = {
    headers,
    methos: "GET"
  };

  const response = await fetch(`${baseUrl}/review/comment/${id}/`, config);
  if (response.status === 200) {
    const comments = await response.json();
    dispatch(getComments(comments));
    console.log(comments);
    return comments;
  } else return false;
};
