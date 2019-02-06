import { types } from "./types";

export const showNotification = (message) => {
    return {
        type: types.SHOW_NOTIFICATION,
        payload: message
    }
};

export const hideNotification = () => {
    return {
        type: types.HIDE_NOTIFICATION,
    }
};

export const showAndClose = (message,closeAfter) => {
    return dispatch =>{
        dispatch(showNotification(message));
        setTimeout(()=>dispatch(hideNotification()),closeAfter);
    }
}