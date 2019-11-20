import { baseUrl } from "../constants";
import { GET_TOP_RESTAURANTS } from "../types";


export const getTopRestaurantsAction = () => async (dispatch, getState) => {
  const headers = new Headers({
    "Content-Type": "application/json"
  });

  const config = {
    headers,
    method: "GET"
  };

  const response = await fetch(`${baseUrl}/home/`, config);
  const restaurants = await response.json();

  dispatch({
    type: GET_TOP_RESTAURANTS,
    payload: restaurants
  });

  return restaurants
}
