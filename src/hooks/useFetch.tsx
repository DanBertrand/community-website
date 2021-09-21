import { useState } from 'react';
import Cookies from 'js-cookie';
import { headers } from '../tools/api';
import { useHistory } from 'react-router-dom';
import { useActions } from '../hooks/useActions';
import { CommunityType } from '../redux/types';
import { UserCommunity } from '../redux/types/communitiesTypes';

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
    title: string;
    description: string;
};

type Data = UserCommunity | UserCommunity[] | CommunityType[];

type UseFetchReturn = {
    data: any | CommunityType;
    error: ErrorType;
    isLoading: boolean;
    get: (query: string) => Promise<CommunityType[] | CommunityType | UserCommunity>;
    post: (
        query: string,
        body:
            | CommunityCreationBody
            | {
                  user_id: number;
              }
            | WorkshopPost
            | JobPost,
        callback?: any,
    ) => Promise<any>;
    put: (query: string, body: UserBody, callback?: any) => Promise<any>;
    remove: (query: string, body?: { url: string }, callback?: any) => Promise<any>;
    submitAvatar: (body: FormData, callback?: any) => Promise<any>;
};

type ErrorType = string;

export type JobType = {
    id: number;
    title: string;
    description: string;
    duration_in_days: number;
    nbr_of_person_required: number;
};

type WorkshopPost = {
    workshop: {
        title: string;
        description: string;
    };
};

type JobPost = {
    job: {
        title: string;
        description: string;
        duration_in_days: number;
        nbr_of_person_required: number;
    };
};

const useFetch = (): UseFetchReturn => {
    const API_URL = process.env.REACT_APP_API_URL;
    const history = useHistory();

    const { displaySuccess, displayError } = useActions();

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
              }
            | WorkshopPost
            | JobPost,
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

            const { data, message } = responseData;

            setIsLoading(false);
            if (callback) {
                console.log('Call BAck');
                await callback();
            }
            if (query === '/communities') {
                history.push(query + `/${responseData.data.id}`);
            }
            displaySuccess(message);
            return data;
        } catch (error) {
            const errMessage = error.error ? error.error : 'An error has occured';
            setError(errMessage);
            displayError(errMessage);
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

            displaySuccess('Avatar updated');

            return responseData;
        } catch (error) {
            const errMessage = error.error ? error.error : 'An error has occured';
            setError(errMessage);
            displayError(errMessage);
            return errMessage;
        }
    };

    // 'delete' is not allowed as a variable declaration name so I use remove
    const remove = async (query: string, body?: { url: string }, callback?: any) => {
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch(API_URL + query, {
                method: 'DELETE',
                headers: headers(token),
                body: JSON.stringify(body),
            });
            const { data, message } = await response.json();
            console.log('data', data);
            console.log('message', message);
            if (!response.ok) {
                throw data;
            }
            // setData(responseData.data);
            setIsLoading(false);
            if (callback) {
                callback();
            }
            console.log('REMOVING !!!!!!');
            displaySuccess('Deleted succesfully');
            return data;
        } catch (error) {
            console.log(error);
            const errMessage = error.error ? error.error : 'An error has occured';
            setError(errMessage);
            displayError(errMessage);
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
