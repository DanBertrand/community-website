import { AuthAction, AuthActionTypes } from './authActionTypes';

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

const authReducer = (state: AuthStateType = initialState, action: AuthAction): AuthStateType => {
    switch (action.type) {
        case AuthActionTypes.authenticateSuccess:
        case AuthActionTypes.loadCurrentUser:
            return {
                ...state,
                token: action.payload.token,
                id: action.payload.id,
                email: action.payload.email,
                isLogged: true,
            };
        case AuthActionTypes.authenticateFail:
        case AuthActionTypes.logout:
            return {
                ...state,
                isLogged: false,
            };
        default:
            return state;
    }
};

export default authReducer;
