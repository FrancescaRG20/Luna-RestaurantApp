import { USER_LOGIN_SUCCESS, USER_LOGOUT, USER_PROFILE } from "../types";

const initialState = {
  user: null,
  token: null,
  authenticated: false
};

export const userLoginReducer = (state = initialState, action) => {

  switch (action.type) {
    case USER_LOGIN_SUCCESS: {
      return { ...state, token: action.payload, authenticated: true }
    }
    case USER_LOGOUT: {
      console.log('in reducer logout')
        const newState = {...initialState}
      return newState;
    }
    case USER_PROFILE : {
      return { ...state, user: action.payload }
    }
    default:
      return state
  }
};