import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import authReducer from './authentication/authReducer';
import flashReducer from './flashmessages/flashReducer';

export interface StoreStateType {
    auth: {
        token: string;
        id?: number | null;
        email?: string;
        isLogged: boolean;
    };
    flash: {
        display: boolean;
        category: string;
        content: string;
    };
}

const rootReducer = combineReducers({
    auth: authReducer,
    flash: flashReducer,
});

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;
