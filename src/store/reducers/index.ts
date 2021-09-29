import { combineReducers } from 'redux';
import authReducer from './authReducer';
import communitiesReducer from './communitiesReducer';
import messagesReducer from './messagesReducer';

const reducers = combineReducers({
    authentication: authReducer,
    communities: communitiesReducer,
    message: messagesReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
