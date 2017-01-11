import { combineReducers } from 'redux';
import ReducerPolls from 'ReducerPolls';
import {reducer as form} from 'redux-form';
import AuthReducer from 'AuthReducer';
import ErrorReducer from 'ErrorReducer';

const RootReducer = combineReducers({
	polls: ReducerPolls,
	form,
	auth: AuthReducer,
	error: ErrorReducer
});

export default RootReducer;
