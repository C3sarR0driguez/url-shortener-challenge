import { types } from "../actions";

const initialState = {
  show: null,
  message: "",
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_NOTIFICATION:
      return {
        show: true,
        message: action.payload
      };
    case types.HIDE_NOTIFICATION:
      return {
        ...state,
        show: false
      };
    default:
      return { ...state };
  }
};

export default uiReducer;
