import { SEARCH_RESTAURANTS, SEARCH_REVIEWS, SEARCH_USERS } from "../types";

const initialState = {
  restaurants: [],
  reviews: [],
  users: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SEARCH_RESTAURANTS:
      return { ...state, restaurants: payload };

    case SEARCH_REVIEWS:
      return { ...state, reviews: payload };

    case SEARCH_USERS:
      return { ...state, users: payload };

    default:
      return state;
  }
};
