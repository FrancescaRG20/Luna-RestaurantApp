import { baseUrl } from "../constants";
import { RESTAURANT_REVIEWS } from "../types";


export const singleRestaurantReviews = reviews => ({
    type: RESTAURANT_REVIEWS,
    payload: reviews
  });
  
export const getSingleRestaurantReviewsAction = id => async (dispatch, getState) => {
   
  const headers = new Headers({
    'Content-Type': 'application/json',
  });
   
  const config = {
    headers,
    method: 'GET'
  };

  const response = await fetch(`${ baseUrl }/reviews/restaurant/${id}/`, config);
  if(response.status === 200){
      const reviews = await response.json();
      console.log(reviews)
      dispatch(singleRestaurantReviews(reviews));
      return reviews;
    }else return response
}