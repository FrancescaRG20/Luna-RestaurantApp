import { GET_TOP_RESTAURANTS} from "../types";

const initialState = {
    topRestaurants: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case GET_TOP_RESTAURANTS:
        return { topRestaurants: payload }

    default:
        return state
    }
}
