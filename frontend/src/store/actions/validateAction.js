import { baseUrl } from "../constants";
import { USER_VALIDATION_SUCCESS} from "../types";
import {userLoginAction} from './loginAction'

export const validate = () => ({
  type: USER_VALIDATION_SUCCESS,
});

export const userValidateAction = data => async (dispatch, getState) => {
  console.log(data)
  const headers = new Headers({
    'Content-Type': 'application/json'
  });
  const body = JSON.stringify(data);

  const config = {
    headers,
    body,
    method: 'POST'
  };

  let response = await fetch(`${ baseUrl }/registration/validate/`, config);
  response = await response.json();
  console.log(response)
  dispatch(validate());
  const login = { username: data.username, password: data.password}
  dispatch(userLoginAction(login))
  return response;
};