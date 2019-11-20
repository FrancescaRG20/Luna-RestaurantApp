import { baseUrl } from "../constants";
import { USER_REGISTRATION_SUCCESS} from "../types";

export const register = () => ({
  type: USER_REGISTRATION_SUCCESS,
});

export const userRegisterAction = data => async (dispatch, getState) => {
  const headers = new Headers({
    'Content-Type': 'application/json'
  });
  const body = JSON.stringify(data);
  const config = {
    headers,
    body,
    method: 'POST'
  };

  const response = await fetch(`${ baseUrl }/registration/`, config);
  dispatch(register());
  return response.status;
};