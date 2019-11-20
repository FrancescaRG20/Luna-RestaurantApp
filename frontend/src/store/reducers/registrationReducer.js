import { USER_REGISTRATION_SUCCESS, USER_VALIDATION_SUCCESS } from "../types";

const initialState = {
  registered: false,
  validated: false
};

export const userRegistrationReducer = (state = initialState, action) => {

  switch (action.type) {
    case USER_REGISTRATION_SUCCESS: {
      return { ...state, registered: true }
    }
    case USER_VALIDATION_SUCCESS: {
      return { ...state, validated: true }
    }

    default:
      return state
  }
};