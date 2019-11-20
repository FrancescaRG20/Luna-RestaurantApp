import { baseUrl } from "../constants";
import { RESTAURANT_PROFILE } from "../types";


export const singleRestaurant = restaurant => ({
    type: RESTAURANT_PROFILE,
    payload: restaurant
  });
  
export const getSingleRestaurantAction = id => async (dispatch, getState) => {
    console.log('getSingleRestaurant called')
  const headers = new Headers({
    'Content-Type': 'application/json',
  });
   
  const config = {
    headers,
    method: 'GET'
  };

  const response = await fetch(`${ baseUrl }/restaurants/${id}/`, config);
  if(response.status === 200){
      const restaurant = await response.json();
      console.log(restaurant)
      dispatch(singleRestaurant(restaurant));
      return restaurant;
    }else return response
}