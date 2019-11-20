import { baseUrl } from "../../store/constants";
import { NEW_REVIEW } from "../types";


export const newReview = review => ({
  type: NEW_REVIEW,
  payload: review
});

export const newReviewAction = data => async (dispatch, getState) => {
    const headers = new Headers({
        Authorization: `Bearer ${getState().userLoginReducer.token}`,
        'Content-Type': 'application/json'
      });
      const body = JSON.stringify(data.body);
      const config = {
        headers,
        body,
        method: 'POST'
      };
    
      const response = await fetch(`${ baseUrl }/review/new/${data.id}`, config);
      return response.status;   
};
