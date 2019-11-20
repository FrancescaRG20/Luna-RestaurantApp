import { combineReducers } from "redux";
import { userLoginReducer } from "./userLoginReducer";
import { userRegistrationReducer } from "./registrationReducer";
import { restaurantReducer } from "./restaurnatReducer";
import { userCommentsReducer } from "./userCommentsReducer";
import { userReviewsReducer } from "./userReviewsReducer";
import searchReducer from './searchReducer'
import allItemsReducer from './getAllItemsReducer'
import topRestaurantsReducer from './topRestaurantsReducer'

export const reducers = combineReducers({
  userLoginReducer,
  topRestaurantsReducer,
  searchReducer,
  allItemsReducer,
  userRegistrationReducer,
  restaurantReducer,
  userCommentsReducer,
  userReviewsReducer
});
