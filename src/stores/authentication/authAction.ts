import { AuthActionTypes } from './authActionTypes';

export type Data = {
    token: string;
    id?: number;
    email?: string;
};

export type AuthenticateSuccessAction = {
    type: AuthActionTypes.authenticateSuccess;
    payload: Data;
};

export type AuthenticateFailAction = {
    type: AuthActionTypes.authenticateFail;
};

export type LoadCurrentUserAction = {
    type: AuthActionTypes.loadCurrentUser;
    payload: Data;
};

export type LogoutAction = {
    type: AuthActionTypes.logout;
};

export const authenticateSuccess = (data: Data): AuthenticateSuccessAction => {
    console.log('AuthenticateSuccessAction DATA:', data);
    return {
        type: AuthActionTypes.authenticateSuccess,
        payload: data,
    };
};

export const authenticateFail = (): AuthenticateFailAction => {
    return {
        type: AuthActionTypes.authenticateFail,
    };
};

export const loadCurrentUser = (data: Data): LoadCurrentUserAction => {
    return {
        type: AuthActionTypes.loadCurrentUser,
        payload: data,
    };
};

export const logout = (): LogoutAction => {
    return {
        type: AuthActionTypes.logout,
    };
};
