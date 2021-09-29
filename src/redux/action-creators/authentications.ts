import Cookies from 'js-cookie';
import { Dispatch } from 'redux';
import { AuthActionType, MessagesActionType, UserParamsType } from '../types';
import { AuthAction, MessagesAction } from '../actions';
import { headers } from '../../tools/api';

const API_VERSION_URL = process.env.REACT_APP_API_VERSION_URL;
const HOST_URL = process.env.REACT_APP_HOST_URL;
const API_URL = `${HOST_URL}${API_VERSION_URL}`;

export const signup = (signupParams: UserParamsType) => {
    return async (dispatch: Dispatch<AuthAction | MessagesAction>): Promise<void> => {
        const { email, password } = signupParams;
        dispatch({
            type: AuthActionType.SIGNUP_ATTEMPT,
        });
        try {
            const response = await fetch(`${API_URL}/signup`, {
                method: 'POST',
                headers: headers(),
                body: JSON.stringify({
                    user: { email, password },
                }),
            });
            const { error, data } = await response.json();
            if (!response.ok) {
                throw new Error(error);
            }
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
                payload: 'Sign up Successfully',
            });
        } catch (err) {
            dispatch({
                type: AuthActionType.SIGNUP_ERROR,
                payload: `An error has occured ${err}`,
            });
            dispatch({
                type: MessagesActionType.DISPLAY_ERROR_MESSAGE,
                payload: `An error has occured ${err}`,
            });
        }
    };
};

export const login = (loginParams: UserParamsType) => {
    return async (dispatch: Dispatch<AuthAction | MessagesAction>): Promise<void> => {
        const { email, password } = loginParams;
        dispatch({
            type: AuthActionType.LOGIN_ATTEMPT,
        });
        try {
            const response = await fetch(`${API_URL}/login`, {
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
                    type: AuthActionType.LOGIN_SUCCESS,
                    payload: data,
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
        fetch(`${API_URL}/logout`, {
            method: 'DELETE',
            headers: headers(token),
        });
        Cookies.remove('token');
        dispatch({
            type: AuthActionType.LOGOUT,
        });
        dispatch({
            type: MessagesActionType.DISPLAY_SUCCESS_MESSAGE,
            payload: 'Logout successfully',
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
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: headers(token),
            });
            console.log('response', response);

            const { error, data } = await response.json();
            if (!response.ok) {
                Cookies.remove('token');
                throw new Error(error);
            }
            dispatch({
                type: AuthActionType.LOGIN_SUCCESS,
                payload: data,
            });
        } catch (err) {
            dispatch({
                type: AuthActionType.LOGIN_ERROR,
                payload: `An error has occured ${err}`,
            });
        }
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
            const response = await fetch(`${API_URL}/profile`, {
                method: 'GET',
                headers: headers(token),
            });
            const { error, data } = await response.json();
            if (!response.ok) {
                Cookies.remove('token');
                throw new Error(error);
            }
            dispatch({
                type: AuthActionType.LOAD_USER_SUCCESS,
                payload: data,
            });
        } catch (err) {
            dispatch({
                type: AuthActionType.LOAD_USER_ERROR,
                payload: `An error has occured ${err}`,
            });
        }
    };
};
