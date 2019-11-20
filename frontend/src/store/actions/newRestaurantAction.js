import { baseUrl } from "../../store/constants";
import { NEW_RESTAURANT } from "../types";
import axios from "axios";

export const newRestaurant = restaurant => ({
  type: NEW_RESTAURANT,
  payload: restaurant
});

export const newRestaurantAction = data => async (dispatch, getState) => {
  let url = `${baseUrl}/restaurants/new/`;
  const config = {
    headers: {
      Authorization: `Bearer ${getState().userLoginReducer.token}`,
      "Content-Type": "multipart/form-data"
    }
  };
  console.log(data)
  const response = await axios.post(url, data, config)
  console.log(response)    
};
