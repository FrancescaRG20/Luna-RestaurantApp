import { baseUrl } from "../constants";
import { GET_ALL_USERS } from "../types";


export const getAllUsersAction = () => async (dispatch, getState) => {
    const headers = new Headers({
        'Content-Type': 'application/json'
    });

    const config = {
        headers,
        method: 'GET',
      };

    const response = await fetch(`${ baseUrl }/users/`, config);
    const results = await response.json();
    
    dispatch({
        type: GET_ALL_USERS,
        payload: results
    });
    
    return results
}