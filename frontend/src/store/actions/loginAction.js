import { baseUrl } from "../constants";
import { USER_LOGIN_SUCCESS} from "../types";
import {getUserProfile} from './getUserProfileAction'

export const userLogin = token => ({
  type: USER_LOGIN_SUCCESS,
  payload: token
});

export const userLoginAction = data => async (dispatch, getState) => {

  console.log('data', data)
  const headers = new Headers({
    'Content-Type': 'application/json'
  });
  const body = JSON.stringify(data);

  const config = {
    headers,
    body,
    method: 'POST'
  };
  
  const response = await fetch(`${ baseUrl }/auth/token/`, config);
  if (response.status){
    console.log(response.status)
  }
  const tokens = await response.json();
  const {access} = tokens;
  if(access !== undefined){
    localStorage.setItem('token', access)
  }
  console.log(tokens)
  await dispatch(userLogin(access));
  dispatch(getUserProfile())
  return response.status;
};
