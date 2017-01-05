import { combineReducers } from 'redux';
import ReducerPolls from 'ReducerPolls';
import ReducerError from 'ReducerError';
import {reducer as form} from 'redux-form';
import AuthReducer from 'AuthReducer';

const RootReducer = combineReducers({
	polls: ReducerPolls,
	error: ReducerError,
	form,
	auth: AuthReducer
});

export default RootReducer;
