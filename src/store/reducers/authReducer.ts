import { AuthAction } from '../actions';
import { AuthActionType, UserType } from '../types';

interface AuthStateType {
    user: UserType | null;
    errorMessage: string;
    isLoading: boolean;
}

const initialState: AuthStateType = {
    user: null,
    errorMessage: '',
    isLoading: false,
};

const authReducer = (state = initialState, action: AuthAction): AuthStateType => {
    switch (action.type) {
        case AuthActionType.LOAD_USER_ATTEMPT:
            return {
                user: null,
                errorMessage: '',
                isLoading: true,
            };
        case AuthActionType.LOGIN_ATTEMPT:
        case AuthActionType.SIGNUP_ATTEMPT:
            return {
                user: null,
                errorMessage: '',
                isLoading: true,
            };
        case AuthActionType.LOAD_USER_SUCCESS:
        case AuthActionType.SIGNUP_SUCCESS:
        case AuthActionType.LOGIN_SUCCESS:
            return {
                user: action.payload,
                errorMessage: '',
                isLoading: false,
            };
        case AuthActionType.SIGNUP_ERROR:
        case AuthActionType.LOGIN_ERROR:
            return {
                user: null,
                errorMessage: action.payload,
                isLoading: false,
            };
        case AuthActionType.LOAD_USER_ERROR:
            return {
                user: null,
                errorMessage: action.payload,
                isLoading: false,
            };
        case AuthActionType.LOGOUT:
            return {
                user: null,
                errorMessage: '',
                isLoading: false,
            };
        default:
            return state;
    }
};

export default authReducer;
