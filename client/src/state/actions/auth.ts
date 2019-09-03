import uuid from 'uuid';

import { REGISTER_SUCCESS, REGISTER_FAILURE } from './constants';
import { Dispatch } from 'redux';

export const setAuth = (message: string, alertType: string) => (dispatch: Dispatch) => {
    const id = uuid.v4();
    dispatch({
        type: REGISTER_SUCCESS,
        payload: {
            id,
            message,
            alertType,
        },
    });
};

export const removeAuth = (message: string, alertType: string) => (dispatch: Dispatch) => {
    const id = uuid.v4();
    dispatch({
        type: REGISTER_FAILURE,
        payload: {
            id,
        },
    });
};
