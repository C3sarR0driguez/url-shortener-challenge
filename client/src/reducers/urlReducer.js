import { types } from "../actions";
const initialState = {
  urls: [],
  isFetching: false,
  fetchError: null,
  isPosting: false,
  postError: null,
  postOk: false,
  fetchOk: false,
  deleteOk: false,
  deleteError: null,
  isDeletingRecord: null
};

const urlReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${types.GET_URLS}_FULFILLED`:
      return {
        ...state,
        urls: action.payload.data,
        isFetching: false,
        fetchError: null,
        fetchOk: true
      };
    case `${types.GET_URLS}_PENDING`:
      return {
        ...state,
        urls: [],
        fetchOk: false,
        fetchError: null,
        isFetching: true
      };
    case `${types.GET_URLS}_REJECTED`:
      return {
        ...state,
        urls: [],
        fetchOk: false,
        fetchError: null,
        isFetching: false
      };
    case `${types.POST_URL}_PENDING`:
      return {
        ...state,
        postOk: false,
        postError: null,
        isPosting: true
      };
    case `${types.POST_URL}_FULFILLED`:
      return {
        ...state,
        postOk: true,
        postError: null,
        isPosting: false
      };
    case `${types.DELETE_URL}_PENDING`:
      return {
        ...state,
        deleteOk: false,
        deleteError: null,
        isDeletingRecord: action.meta
      };
    case `${types.DELETE_URL}_REJECTED`:
      return {
        ...state,
        deleteOk: false,
        deleteError: action.payload,
        isDeletingRecord: null
      };
    case `${types.DELETE_URL}_FULFILLED`:
      return {
        ...state,
        deleteOk: true,
        deleteError: null,
        isDeletingRecord: null
      };
    default:
      return { ...state };
  }
};

export default urlReducer;
