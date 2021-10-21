import Cookies from 'js-cookie';
import { AuthActionType, MessagesActionType, UserParamsType } from '../types';
import { AuthAction, MessagesAction } from '../actions';
import { headers } from '../../helpers/api';
import { Dispatch } from 'redux';
import { get } from '../../helpers/api';

export const signup = (signupParams: UserParamsType) => {
    return async (dispatch: Dispatch<AuthAction | MessagesAction>): Promise<void> => {
        const { email, password } = signupParams;
        dispatch({
            type: AuthActionType.SIGNUP_ATTEMPT,
        });
        try {
            const response = await fetch(`${get('API_URL')}/signup`, {
                method: 'POST',
                headers: headers(),
                body: JSON.stringify({
                    user: { email, password },
                }),
            });
            const { message, data } = await response.json();
            if (!response.ok) {
                dispatch({
                    type: AuthActionType.SIGNUP_ERROR,
                    payload: message,
                });
                dispatch({
                    type: MessagesActionType.DISPLAY_ERROR_MESSAGE,
                    payload: message,
                });
            } else {
                const token = response.headers.get('authorization')?.split(' ')[1] || '';
                if (token) {
                    Cookies.set('token', token);
                }
                dispatch({
                    type: AuthActionType.SIGNUP_SUCCESS,
                    payload: data,
                });
                dispatch({
                    type: MessagesActionType.DISPLAY_SUCCESS_MESSAGE,
                    payload: message,
                });
            }
        } catch (err) {}
    };
};

export const login = (loginParams: UserParamsType) => {
    return async (dispatch: Dispatch<AuthAction | MessagesAction>): Promise<void> => {
        const { email, password } = loginParams;

        dispatch({
            type: AuthActionType.LOGIN_ATTEMPT,
        });
        try {
            const response = await fetch(`${get('API_URL')}/login`, {
                method: 'POST',
                headers: headers(),
                body: JSON.stringify({
                    user: { email, password },
                }),
            });
            const { message, data } = await response.json();
            if (response.ok) {
                const token = response.headers.get('authorization')?.split(' ')[1] || '';
                if (token) {
                    Cookies.set('token', token);
                }
                dispatch({
                    type: AuthActionType.LOGIN_SUCCESS,
                    payload: data,
                });
                dispatch({
                    type: MessagesActionType.DISPLAY_SUCCESS_MESSAGE,
                    payload: message,
                });
            } else {
                dispatch({
                    type: AuthActionType.LOGIN_ERROR,
                    payload: message,
                });
                dispatch({
                    type: MessagesActionType.DISPLAY_ERROR_MESSAGE,
                    payload: message,
                });
            }
        } catch (err) {}
    };
};

export const logout = () => {
    return async (dispatch: Dispatch<AuthAction | MessagesAction>): Promise<void> => {
        const token = Cookies.get('token');
        const response = await fetch(`${get('API_URL')}/logout`, {
            method: 'DELETE',
            headers: headers(token),
        });
        const { message } = await response.json();
        Cookies.remove('token');
        dispatch({
            type: AuthActionType.LOGOUT,
        });
        dispatch({
            type: MessagesActionType.DISPLAY_SUCCESS_MESSAGE,
            payload: message,
        });
    };
};

export const autoLogin = () => {
    return async (dispatch: Dispatch<AuthAction | MessagesAction>): Promise<void> => {
        dispatch({
            type: AuthActionType.LOGIN_ATTEMPT,
        });
        try {
            const token = Cookies.get('token');
            if (!token) return;
            const response = await fetch(`${get('API_URL')}/login`, {
                method: 'POST',
                headers: headers(token),
            });
            const { message, data } = await response.json();
            if (!response.ok) {
                Cookies.remove('token');
                dispatch({
                    type: AuthActionType.LOGIN_ERROR,
                    payload: message,
                });
            }
            if (response.ok) {
                dispatch({
                    type: AuthActionType.LOGIN_SUCCESS,
                    payload: data,
                });
            }
        } catch (err) {}
    };
};

export const loadUser = () => {
    return async (dispatch: Dispatch<AuthAction>): Promise<void> => {
        dispatch({
            type: AuthActionType.LOAD_USER_ATTEMPT,
        });
        try {
            const token = Cookies.get('token');
            if (!token) return;
            const response = await fetch(`${get('API_URL')}/profile`, {
                method: 'GET',
                headers: headers(token),
            });
            const { message, data } = await response.json();
            if (!response.ok) {
                Cookies.remove('token');
                dispatch({
                    type: AuthActionType.LOAD_USER_ERROR,
                    payload: message,
                });
            } else {
                dispatch({
                    type: AuthActionType.LOAD_USER_SUCCESS,
                    payload: data,
                });
            }
        } catch (err) {}
    };
};
