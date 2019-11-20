import { baseUrl } from "../constants";
import { GET_ALL_REVIEWS } from "../types";


export const getAllReviewsAction = () => async (dispatch, getState) => {
    const headers = new Headers({
        'Content-Type': 'application/json'
    });

    const config = {
        headers,
        method: 'GET',
      };

    const response = await fetch(`${ baseUrl }/reviews/`, config);
    const results = await response.json();
    
    dispatch({
        type: GET_ALL_REVIEWS,
        payload: results
    });
    
    return results   
}