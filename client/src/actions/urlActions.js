import { types } from "./types";
import axios from "axios";
import { showAndClose } from "./uiActions";
import errorHandler from "../utils/errorHandler";

export const getUrls = () => {
  return dispatch => dispatch({
      type: types.GET_URLS,
      payload: axios.get("/api/urls")
    }).catch(err => {
      const message = errorHandler(err, "Unable to fetch urls").friendlyMessage;
      dispatch(showAndClose(message, 5000));
    });
};

export const postUrl = url => {
  return dispatch => ({
    type: types.POST_URL,
    payload: axios
      .post(
        "/api/urls",
        {
          url
        },
        {
          headers: {
            "Content-type": "application/json"
          }
        }
      )
      .then(() => {
        dispatch(getUrls());
        dispatch(showAndClose("operation succesful :)", 3000));
      })
      .catch(err => {
        const message = errorHandler(err, "Unable to submit resource")
          .friendlyMessage;
        dispatch(showAndClose(message, 5000));
      })
  });
};

export const deleteUrl = (id, hash, removeToken) => {
  return dispatch => {
    dispatch({
      type: types.DELETE_URL,
      payload: axios.delete(`/api/urls/${hash}/${removeToken}`),
      meta: id
    })
      .then(_ => {
        dispatch(showAndClose("Record deletion succesful :)", 3000));
        dispatch(getUrls());
      })
      .catch(err => {
        const message = errorHandler(err, "Unable to delete resource")
          .friendlyMessage;
        dispatch(showAndClose(message, 5000));
      });
  };
};
