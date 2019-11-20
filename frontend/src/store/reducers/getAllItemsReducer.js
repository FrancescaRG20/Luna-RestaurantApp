import { GET_ALL_RESTAURANTS, GET_ALL_REVIEWS, GET_ALL_USERS } from "../types";

const initialState = {
  restaurants: [],
  reviews: [],
  users: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_RESTAURANTS:
      return { restaurants: payload };

    case GET_ALL_REVIEWS:
      return { reviews: payload };

    case GET_ALL_USERS:
      return { users: payload };

    default:
      return state;
  }
};
