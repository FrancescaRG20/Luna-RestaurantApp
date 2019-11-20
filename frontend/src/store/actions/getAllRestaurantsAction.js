import { baseUrl } from "../constants";
import { GET_ALL_RESTAURANTS } from "../types";


export const getAllRestaurantsAction = () => async (dispatch, getState) => {
    const headers = new Headers({
        'Content-Type': 'application/json'
    });

    const config = {
        headers,
        method: 'GET',
      };

    const response = await fetch(`${ baseUrl }/restaurants/`, config);
    const results = await response.json();
    
    dispatch({
        type: GET_ALL_RESTAURANTS,
        payload: results
    });
    
    return results   
}
