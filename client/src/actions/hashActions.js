import { types } from "./types";
import axios from "axios";
import { showAndClose } from "./uiActions";
import errorHandler from "../utils/errorHandler";

export const getUrlFromHash = (hash) => {
    return dispatch => dispatch({
        type: types.GET_HASH,
        payload: axios.get(`/api/urls/${hash}`)
    }).catch(err => {
        const message = errorHandler(err, "Unable to fetch the desired hash").friendlyMessage;
        dispatch(showAndClose(message,5000));
    })
};