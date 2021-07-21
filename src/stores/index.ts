import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import authReducer from './authentication/authReducer';

export interface StoreStateType {
    auth: {
        token: string;
        id?: number | null;
        email?: string;
        isLogged: boolean;
    };
}

const reducers = combineReducers<StoreStateType>({
    auth: authReducer,
});

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, compose(applyMiddleware(thunkMiddleware)));

export default store;
