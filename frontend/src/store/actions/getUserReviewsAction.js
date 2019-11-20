import { baseUrl } from "../constants";

export const getReviews = reviews => ({
  type: "GET_USER_REVIEWS",
  payload: reviews
});

export const getUserReviewsAction = id => async (dispatch, getState) => {
  console.log("Get reviews action");
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

  const response = await fetch(`${baseUrl}/reviews/user/${id}/`, config);
  if (response.status === 200) {
    const reviews = await response.json();
    dispatch(getReviews(reviews));
    console.log(reviews);
    return reviews;
  } else return false;
};
