import { combineReducers } from 'redux';
import AuthReducer from './auth.reducers';
export const rootReducer = combineReducers({
    auth: AuthReducer
});