import { baseUrl } from "../constants";
import { USER_PROFILE } from "../types";


export const userProfile = user => ({
    type: USER_PROFILE,
    payload: user
  });
  
export const getUserProfile = () => async (dispatch, getState) => {
    console.log('getUserProfile called')
  const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization : `Bearer ${getState().userLoginReducer.token}`
  });
   
  

  const config = {
    headers,
    method: 'GET'
  };

  const response = await fetch(`${ baseUrl }/me/`, config);
  const user = await response.json();
  console.log(user)
  if(user !== undefined){
    localStorage.setItem('user', JSON.stringify(user))
  }
  dispatch(userProfile(user));
  return user;
}

