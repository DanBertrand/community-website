import { useState } from 'react';
import Cookies from 'js-cookie';
import { headers } from '../tools/api';
import { useHistory } from 'react-router-dom';

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

type UserBody = {
    account_update: {
        first_name: string;
        last_name: string;
        password: string;
    };
};

type Community = {
    id: number;
    name: string;
    description: string;
    address: string;
    user_id: number;
};

export type WorkshopType = {
    id: number;
    name: string;
};

type Data = Community | Community[] | undefined;

type UseFetchReturn = {
    data: any | Community;
    error: ErrorType;
    isLoading: boolean;
    get: (query: string) => Promise<Community[] | Community | undefined>;
    post: (
        query: string,
        body:
            | CommunityCreationBody
            | {
                  user_id: number;
              },
        callback?: any,
    ) => Promise<any>;
    put: (query: string, body: UserBody, callback?: any) => Promise<any>;
    remove: (query: string, body: { url: string }, callback?: any) => Promise<any>;
    submitAvatar: (body: FormData, callback?: any) => Promise<any>;
};

type ErrorType = string;

const useFetch = (): UseFetchReturn => {
    const API_URL = process.env.REACT_APP_API_URL;
    const history = useHistory();

    const [data, setData] = useState<Data>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<ErrorType>('');
    const token = Cookies.get('token');

    const get = async (query: string) => {
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch(API_URL + query, {
                method: 'GET',
                headers: headers(token),
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw responseData;
            }
            setData(responseData.data);
            setIsLoading(false);
            return responseData;
        } catch (error) {
            const errMessage = error.error ? error.error : 'An error has occured';
            setError(errMessage);
        }
    };

    const post = async (
        query: string,
        body:
            | CommunityCreationBody
            | {
                  user_id: number;
              },
        callback?: any,
    ) => {
        setIsLoading(true);
        setError('');
        console.log('BODY', body);

        // const generateBody = bo

        try {
            const response = await fetch(API_URL + query, {
                method: 'POST',
                headers: headers(token),
                body: JSON.stringify(body),
            });
            console.log('response', response);
            const responseData = await response.json();
            console.log('responseData', responseData);
            if (!response.ok) {
                throw responseData;
            }
            // setData(responseData.data);
            setIsLoading(false);
            if (callback) {
                console.log('Call BAck');
                await callback();
            }
            if (query === '/communities') {
                history.push(query + `/${responseData.data.id}`);
            }
            return responseData;
        } catch (error) {
            const errMessage = error.error ? error.error : 'An error has occured';
            setError(errMessage);
        }
    };

    const put = async (query: string, body: UserBody, callback?: any) => {
        setIsLoading(true);
        setError('');
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
            setData(responseData.data);
            setIsLoading(false);
            if (callback) {
                callback();
            }
            return responseData;
        } catch (error) {
            const errMessage = error.error ? error.error : 'An error has occured';
            setError(errMessage);
        }
    };

    const submitAvatar = async (body: FormData, callback?: any) => {
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch(API_URL + '/user/avatars', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
                body: body,
            });
            console.log('response', response);
            const responseData = await response.json();
            console.log('responseData', responseData);
            if (!response.ok) {
                throw responseData;
            }
            setData(responseData.data);
            setIsLoading(false);
            if (callback) {
                callback();
            }

            return responseData;
        } catch (error) {
            const errMessage = error.error ? error.error : 'An error has occured';
            setError(errMessage);
            return errMessage;
        }
    };

    // 'delete' is not allowed as a variable declaration name so I use remove
    const remove = async (query: string, body: { url: string }, callback?: any) => {
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch(API_URL + query, {
                method: 'DELETE',
                headers: headers(token),
                body: JSON.stringify(body),
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw responseData;
            }
            // setData(responseData.data);
            setIsLoading(false);
            if (callback) {
                callback();
            }
            return responseData;
        } catch (error) {
            const errMessage = error.error ? error.error : 'An error has occured';
            setError(errMessage);
        }
    };

    return {
        data,
        error,
        isLoading,
        get,
        post,
        put,
        remove,
        submitAvatar,
    };
};

export default useFetch;
