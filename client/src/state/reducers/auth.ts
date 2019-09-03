// Global Alert Reducer
import { REGISTER_SUCCESS, REGISTER_FAILURE } from '../actions';

// TODO: Define Interface
const initialAlertState: boolean = false;

export const authentication = (state = initialAlertState, action: any) => {
    const { type } = action;
    switch (type) {
        case REGISTER_SUCCESS:
            return !state;
        case REGISTER_FAILURE:
            return !state;
        default:
            return state;
    }
};
