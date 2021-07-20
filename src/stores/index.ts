import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import authReducer, { AuthState } from './authentication/authReducer';

interface StoreState {
    auth: AuthState;
}

const reducers = combineReducers<StoreState>({
    auth: authReducer,
});

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, compose(applyMiddleware(thunkMiddleware)));

export default store;
