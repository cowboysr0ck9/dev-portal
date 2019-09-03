import { combineReducers } from 'redux';

// Application Reducers
import { authentication } from './auth';
import { alert } from './alert';

// Combines All Application Reducers
const ROOT_REDUCER = combineReducers({ isAuthenticated: authentication, alert });

export default ROOT_REDUCER;
