import { NEW_RESTAURANT, GET_RESTAURANTS, RESTAURANT_PROFILE } from "../types";

const initialState = {
  restaurants: [],
  currentRestaurant:null
};

export const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RESTAURANTS:{
        const newState = {...state}
        newState.restaurants = action.payload
        return newState
    }

    case NEW_RESTAURANT: {
        const newState = {...state}
        newState.restaurants.push(action.payload)
        return newState
    }
    case RESTAURANT_PROFILE:{
        const newState = {...state}
        newState.currentRestaurant = action.payload
        return newState
    }

    default:
      return state;
  }
};
