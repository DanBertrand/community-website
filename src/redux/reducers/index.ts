import { combineReducers } from 'redux';
import authReducer from './authReducer';
import communitiesReducer from './communitiesReducer';

const reducers = combineReducers({
    authentication: authReducer,
    communities: communitiesReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
