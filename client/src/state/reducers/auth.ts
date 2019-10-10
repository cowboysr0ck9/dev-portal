// Global Alert Reducer
import { REGISTER_SUCCESS, REGISTER_FAILURE } from '../actions';

export interface IAuthReducer {
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    user: string | null;
}

const initialState: IAuthReducer = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: true,
    user: null,
};

export const authentication = (state = initialState, action: any) => {
    const { type, payload } = action;
    switch (type) {
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                isLoading: false,
            };
        case REGISTER_FAILURE:
            localStorage.removeItem('token');
            return { ...state, token: false, isAuthenticated: false, isLoading: false };
        default:
            return state;
    }
};
