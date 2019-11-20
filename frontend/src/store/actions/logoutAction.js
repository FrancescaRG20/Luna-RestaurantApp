import { USER_LOGOUT} from "../types";

const userLogout = () => ({
  type: USER_LOGOUT,
});

export const logoutAction = () =>  (dispatch, getState) => {
    console.log('logout action')
    dispatch(userLogout())
    localStorage.clear()
    return 'succesful'
};
