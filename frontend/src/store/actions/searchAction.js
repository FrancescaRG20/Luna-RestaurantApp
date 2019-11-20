import { baseUrl } from "../constants";
import { SEARCH_RESTAURANTS, SEARCH_REVIEWS, SEARCH_USERS } from "../types";


export const searchAction = data => async (dispatch, getState) => {
    
    const headers = new Headers({
        'Content-Type': 'application/json'
    });
    console.log(data)
    const body = JSON.stringify(data)
    const config = {
        headers,
        body,
        method: 'POST',
      };
    const response = await fetch(`${ baseUrl }/search/`, config);
    const results = await response.json();

    let actionType;
      console.log(results)
    if (data.type === "restaurants") {
        actionType = SEARCH_RESTAURANTS
    } else if (data.type === "reviews") {
        actionType = SEARCH_REVIEWS
    } else if (data.type === "users") {
        actionType = SEARCH_USERS
    }
    
    dispatch({
        type: actionType,
        payload: results
    });
    
    return results
}