import { ActionTypes, Action } from './actions/types';

export type AuthStateType = {
    token: string;
    id?: number | null;
    email?: string;
    isLogged: boolean;
};

const initialState = {
    token: '',
    id: null,
    email: '',
    isLogged: false,
};

const authReducer = (state: AuthStateType = initialState, action: Action): AuthStateType => {
    switch (action.type) {
        case ActionTypes.authenticateSuccess:
        case ActionTypes.loadCurrentUser:
            return {
                ...state,
                token: action.payload.token,
                id: action.payload.id,
                email: action.payload.email,
                isLogged: true,
            };
        case ActionTypes.authenticateFail:
        case ActionTypes.logout:
            return {
                ...state,
                isLogged: false,
            };
        default:
            return state;
    }
};

export default authReducer;
