import Cookies from 'js-cookie';
import { registerFail, registerSuccess } from './actions/authAction';
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
                dispatch(registerFail());
                Cookies.remove('token');
                console.log('Une erreur est survenue:', dataError);
                return false;
            }
            const token = response.headers.get('authorization')?.split(' ')[1] || '';
            Cookies.set('token', token);
            const user: User = await response.json();
            const { id, email } = user;
            const userToRegister = { token, id, email };
            dispatch(registerSuccess(userToRegister));
            console.log('Inscription réussie');
            return true;
        } catch (error) {
            console.log(error);
            console.log('FINITO ERROR');
            return false;
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
