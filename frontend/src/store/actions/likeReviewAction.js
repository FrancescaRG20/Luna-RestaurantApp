import { baseUrl } from "../constants";

export const likeReviewAction = reviewId => async (dispatch, getState) => {
  const headers = new Headers({
    'Content-Type': 'application/json'
  });
  const body = null
  const config = {
    headers,
    body,
    method: 'POST'
  };

  const response = await fetch(`${ baseUrl }/reviews/like/${reviewId}/`, config);
  
  if (response.status === 201) {
      console.log('liked!')
    return true
  } else {
      console.log('not liked?')
    return false
  }
   
};