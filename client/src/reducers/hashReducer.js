import { types } from "../actions";
import errorHandler from "../utils/errorHandler";
const initialState = {
  url: null,
  isFetching: false,
  fetchOk: false,
  fetchError: null,
  notFound: false,
};

const urlReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${types.GET_HASH}_FULFILLED`:
      return {
        ...initialState,
        fetchOk: true,
        url: action.payload.data,
      };
    case `${types.GET_HASH}_PENDING`:
      return {
        ...initialState,
        isFetching: true,
      };
    case `${types.GET_HASH}_REJECTED`:
      return {
        ...initialState,
        isFetching: false,
        fetchError: action.payload,
        notFound: errorHandler(action.payload).is404
      };
    default:
      return { ...state };
  }
};

export default urlReducer;
