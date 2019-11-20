import { NEW_REVIEW, GET_USER_REVIEWS, CURRENT_RESTAURANT_REVIEWS } from "../types";
const initialState = {
  reviews: [],
  currentRestaurantReviews: null
};
export const userReviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REVIEWS: {
      const newState = { ...state };
      newState.reviews = action.payload;
      return newState;
    }
    case NEW_REVIEW: {
      const newState = { ...state };
      newState.reviews.push(action.payload);
      return newState;
    }
    case CURRENT_RESTAURANT_REVIEWS: {
      const newState = { ...state };
      newState.currentRestaurantReviews = action.payload;
      return newState;
    }
    default:
      return state;
  }
};
