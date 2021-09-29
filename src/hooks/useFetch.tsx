import Cookies from 'js-cookie';
import { useReducer } from 'react';
import { headers } from '../tools/api';
import { useActions } from './useActions';
import { useHistory } from 'react-router-dom';
import { UserType } from '../redux/types';

interface State<T> {
    data?: T;
    error?: Error;
    isLoading: boolean;
}

type Url = {
    url: string;
};

type CallBack = () => void;

type AvatarPost = {
    image: File;
    password: string;
};

type UserBody = {
    account_update: {
        first_name: string;
        last_name: string;
        password: string;
    };
};

export type WorkshopType = {
    id: number;
    title: string;
    description: string;
};

interface FetchReturn<T> {
    state: State<T>;
    get: (query: string) => void;
    post: (
        query: string,
        body: CommunityCreationBody | WorkshopCreationBody | JobCreationBody | AvatarPost,
        callback?: CallBack,
    ) => void;
    patch: (query: string, body: unknown, callback?: CallBack) => Promise<void>;
    put: (query: string, body: UserBody, callback?: CallBack) => Promise<void>;
    remove: (query: string, body?: Url | undefined, callback?: CallBack) => Promise<void>;
    postAvatar: (query: string, body: FormData) => Promise<void>;
}

type CommunityCreationBody = {
    name: string;
    description: string;
    formatted_address: string;
    longitude: string;
    latitude: string;
    house_number: string;
    street: string;
    post_code: string;
    city: string;
    state: string;
    country: string;
};

type WorkshopCreationBody = {
    workshop: {
        title: string;
        description: string;
    };
};

type JobCreationBody = {
    job: { title: string; description: string; nbr_of_person_required: number; duration_in_days: number };
};

export type JobType = {
    id: number;
    community_id: number;
    title: string;
    description: string;
    duration_in_days: number;
    nbr_of_person_required: number;
    users: UserType[];
};

type Action<T> =
    | { type: 'loading' }
    | { type: 'got'; payload: T }
    | { type: 'posted' }
    | { type: 'patched' }
    | { type: 'deleted' }
    | { type: 'error'; payload: Error };

function useFetch<T = unknown>(): FetchReturn<T> {
    const { displaySuccess, displayError } = useActions();
    const token = Cookies.get('token');

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const API_VERSION_EXTENSION = process.env.REACT_APP_API_VERSION_EXTENSION;
    const API_URL = `${API_BASE_URL}${API_VERSION_EXTENSION}`;

    const history = useHistory();

    const initialState: State<T> = {
        error: undefined,
        data: undefined,
        isLoading: false,
    };

    const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
        switch (action.type) {
            case 'loading':
                return { ...initialState, isLoading: true };
            case 'got':
                return { ...initialState, data: action.payload, isLoading: false };
            case 'posted':
            case 'patched':
            case 'deleted':
                return { ...state, isLoading: false };
            case 'error':
                return { ...initialState, error: action.payload, isLoading: false };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(fetchReducer, initialState);

    const get = async (query: string) => {
        dispatch({ type: 'loading' });
        try {
            const response = await fetch(API_URL + query, {
                method: 'GET',
                headers: headers(token),
            });
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const responseData = await response.json();
            dispatch({ type: 'got', payload: responseData.data as T });
        } catch (error) {
            dispatch({ type: 'error', payload: error as Error });
        }
    };

    const post = async (
        query: string,
        body: CommunityCreationBody | WorkshopCreationBody | JobCreationBody | AvatarPost,
        callback?: CallBack,
    ) => {
        dispatch({ type: 'loading' });
        console.log('body', body);
        try {
            const response = await fetch(API_URL + query, {
                method: 'POST',
                headers: headers(token),
                body: JSON.stringify(body),
            });
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            console.log(response);
            const responseData = await response.json();
            console.log(responseData);
            const { message } = responseData;
            dispatch({ type: 'posted' });
            displaySuccess(message);
            if (callback) {
                console.log('Call BAck');
                await callback();
            }
            if (query === '/communities') {
                history.push(query + `/${responseData.data.id}`);
            }
        } catch (error) {
            displayError(`An error has occurred ${error}`);
        }
    };

    const postAvatar = async (query: string, body: FormData) => {
        dispatch({ type: 'loading' });
        console.log('body', body);
        try {
            const response = await fetch(API_URL + query, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
                body: body,
            });
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            console.log(response);
            const responseData = await response.json();
            console.log(responseData);
            const { message } = responseData;
            dispatch({ type: 'posted' });
            displaySuccess(message);
        } catch (error) {
            displayError(`An error has occurred ${error}`);
        }
    };

    const put = async (query: string, body: UserBody, callback?: CallBack) => {
        try {
            const response = await fetch(API_URL + query, {
                method: 'PUT',
                headers: headers(token),
                body: JSON.stringify(body),
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw responseData;
            }

            if (callback) {
                callback();
            }
            return responseData;
        } catch (error) {
            displayError(`An error has occurred ${error}`);
        }
    };

    const patch = async (query: string, body: unknown, callback?: CallBack) => {
        try {
            const response = await fetch(API_URL + query, {
                method: 'PATCH',
                headers: headers(token),
                body: JSON.stringify(body),
            });
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const responseData = await response.json();
            const { message } = responseData;
            dispatch({ type: 'patched' });
            displaySuccess(message);
            if (callback) {
                callback();
            }
        } catch (error) {
            displayError(`An error has occurred ${error}`);
        }
    };

    // 'delete' is not allowed as a variable declaration name so I use remove
    const remove = async (query: string, body?: { url: string }, callback?: CallBack) => {
        try {
            const response = await fetch(API_URL + query, {
                method: 'DELETE',
                headers: headers(token),
                body: JSON.stringify(body),
            });
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const responseData = await response.json();
            const { message } = responseData;
            if (callback) {
                callback();
            }
            dispatch({ type: 'deleted' });
            displaySuccess(message);
        } catch (error) {
            displayError(`An error has occurred ${error}`);
        }
    };

    return {
        state,
        get,
        post,
        patch,
        remove,
        put,
        postAvatar,
    };
}

export default useFetch;
