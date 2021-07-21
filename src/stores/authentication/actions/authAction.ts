// import * as actionTypes from '../authTypes';
import { ActionTypes } from './types';

export type Data = {
    token: string;
    id?: number;
    email?: string;
};

export type AuthenticateSuccessAction = {
    type: ActionTypes.authenticateSuccess;
    payload: Data;
};

export type AuthenticateFailAction = {
    type: ActionTypes.authenticateFail;
};

export type LoadCurrentUserAction = {
    type: ActionTypes.loadCurrentUser;
    payload: Data;
};

export type LogoutAction = {
    type: ActionTypes.logout;
};

export const authenticateSuccess = (data: Data): AuthenticateSuccessAction => {
    console.log('AuthenticateSuccessAction DATA:', data);
    return {
        type: ActionTypes.authenticateSuccess,
        payload: data,
    };
};

export const authenticateFail = (): AuthenticateFailAction => {
    return {
        type: ActionTypes.authenticateFail,
    };
};

export const loadCurrentUser = (data: Data): LoadCurrentUserAction => {
    return {
        type: ActionTypes.loadCurrentUser,
        payload: data,
    };
};

export const logout = (): LogoutAction => {
    return {
        type: ActionTypes.logout,
    };
};
