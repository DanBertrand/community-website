import { useState } from 'react';
import Cookies from 'js-cookie';
import { headers } from '../tools/api';

type Community = {
    id: number;
    name: string;
    description: string;
    address: string;
    user_id: number;
};
type CommunitiesList = Community[];

type UseFetchReturn = {
    data: CommunitiesList;
    error: ErrorType;
    isLoading: boolean;
    get: (query: string) => Promise<CommunitiesList | undefined>;
};

type ErrorType = string;
type DataType = CommunitiesList;

const useFetch = (): UseFetchReturn => {
    const API_URL = process.env.REACT_APP_API_URL;

    const [data, setData] = useState<DataType>([]);
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
            const responseData: CommunitiesList = await response.json();

            console.log('responseData', responseData);

            if (!response.ok) {
                throw responseData;
            }
            setData(responseData);
            setIsLoading(false);
            return responseData;
        } catch (error) {
            console.log('Error', error);
            const errMessage = error.error ? error.error : 'An error has occured';
            setError(errMessage);
            console.log(errMessage);
        }
    };

    return {
        data,
        error,
        isLoading,
        get,
    };
};

export default useFetch;
