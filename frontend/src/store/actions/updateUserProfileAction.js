import { baseUrl } from "../constants";
import { userProfile } from "../actions/getUserProfileAction";

export const updateUserProfileAction = data => async (dispatch, getState) => {
  console.log("user update profile", data, getState().userLoginReducer.token);
  const headers = new Headers({
    Authorization: `Bearer ${getState().userLoginReducer.token}`,
    "Content-Type": "application/json"
  });
  const body = JSON.stringify(data);

  const config = {
    headers,
    body,
    method: "PATCH"
  };

  const response = await fetch(`${baseUrl}/me/`, config);
  const profile = await response.json();
  console.log("profile update", profile);
  if (profile) {
    localStorage.setItem("user", JSON.stringify(profile));
    dispatch(userProfile(profile));
  }
  return profile;
};
