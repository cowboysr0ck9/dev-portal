import uuid from 'uuid';

import { SET_ALERT, REMOVE_ALERT } from './constants';
import { Dispatch } from 'redux';

export const setAlert = (message: string, alertType: string, timeout: number) => (dispatch: Dispatch) => {
    const id = uuid.v4();
    dispatch({
        type: SET_ALERT,
        payload: {
            id,
            message,
            alertType,
        },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
