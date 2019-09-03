// Global Alert Reducer
import { SET_ALERT, REMOVE_ALERT } from '../actions';

// TODO: Define Interface
const initialAlertState: any = [];

export const alert = (state = initialAlertState, action: any) => {
    const { type, payload } = action;
    switch (type) {
        case SET_ALERT:
            return [...state, payload];
        case REMOVE_ALERT:
            // Removes All Alerts Except The Matching One
            return state.filter((alert: any) => alert.id !== payload);
        default:
            return state;
    }
};
