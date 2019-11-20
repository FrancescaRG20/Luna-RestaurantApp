import { GET_USER_COMMENTS } from "../types";
const initialState = {
  comments: [],
  currentReviewComments: null
};
export const userCommentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_COMMENTS: {
      const newState = { ...state };
      newState.comments = action.payload;
      return newState;
    }
    default:
      return state;
  }
};
