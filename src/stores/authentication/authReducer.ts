import { ActionTypes, Action } from './actions/types';

export type AuthState = {
    token: string;
    id: number | null;
    email: string;
};

const initialState = {
    token: '',
    id: null,
    email: '',
};

const authReducer = (state: AuthState = initialState, action: Action): AuthState => {
    switch (action.type) {
        case ActionTypes.registerSuccess:
            return {
                ...state,
                token: action.payload.token,
                id: action.payload.id,
                email: action.payload.email,
            };
        case ActionTypes.registerFail:
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default authReducer;
