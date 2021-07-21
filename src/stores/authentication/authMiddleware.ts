import Cookies from 'js-cookie';
import { authenticateFail, authenticateSuccess, loadCurrentUser, logout } from './actions/authAction';
import { Dispatch } from 'redux';

const API_URL = process.env.REACT_APP_API_URL;

type Data = {
    user: {
        email: string;
        password: string;
    };
};

type User = {
    id: number;
    email: string;
};

export const fetchToRegister = (data: Data) => {
    return async (dispatch: Dispatch): Promise<boolean> => {
        try {
            const response = await fetch(`${API_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                const dataError = await response.json();
                dispatch(authenticateFail());
                Cookies.remove('token');
                console.log('Une erreur est survenue:', dataError);
                return false;
            }
            const token = response.headers.get('authorization')?.split(' ')[1] || '';
            Cookies.set('token', token);
            const user: User = await response.json();
            const { id, email } = user;
            const userToRegister = { token, id, email };
            dispatch(authenticateSuccess(userToRegister));
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };
};

export const fetchToLogin = (data: Data) => {
    return async (dispatch: Dispatch): Promise<boolean> => {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                const dataError = await response.json();
                dispatch(authenticateFail());
                Cookies.remove('token');
                console.log('Une erreur est survenue:', dataError);
                return false;
            }
            const token = response.headers.get('authorization')?.split(' ')[1] || '';
            Cookies.set('token', token);
            const user: User = await response.json();
            const { id, email } = user;
            const userToRegister = { token, id, email };
            dispatch(authenticateSuccess(userToRegister));
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };
};

export const fetchToLogout = (token: string) => {
    return async (dispatch: Dispatch): Promise<void> => {
        fetch(`${API_URL}/logout`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }).then(() => {
            dispatch(logout()), Cookies.remove('token');
        });
    };
};

export const fetchCurrentUser = (token: string) => {
    return async (dispatch: Dispatch): Promise<void> => {
        try {
            const response = await fetch(`${API_URL}/profile`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw Error(response.statusText);
            }
            const user = await response.json();
            const userToLoad = { token, user };
            dispatch(loadCurrentUser(userToLoad));
        } catch (error) {
            console.log(error);
            dispatch(authenticateFail());
            Cookies.remove('token');
        }
    };
};

// interface Body {
//     errors?: [];
//     user?: any;
// }

// interface Response {
//     ok: boolean;
//     status: number;
//     json: () => { ResponseBody: Body };
// }

// type User = {
//     id: number;
//     email: string;
// };

// type Errors = {
//     status: string;
//     code: string;
//     title: string;
//     details: [];
// };
