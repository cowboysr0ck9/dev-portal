import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import ROOT_REDUCER from './reducers';

// Stores Application State Middleware
const middleware = [thunk];

// Exports Global Application Store
export const store = createStore(ROOT_REDUCER, {}, composeWithDevTools(applyMiddleware(...middleware)));
