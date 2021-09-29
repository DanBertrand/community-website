import { Dispatch } from 'redux';
import { CommunitiesActionType } from '../types';
import { CommunitiesAction } from '../actions';
import { headers } from '../../tools/api';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION_EXTENSION = process.env.REACT_APP_API_VERSION_EXTENSION;
const API_URL = `${API_BASE_URL}${API_VERSION_EXTENSION}`;

export const loadCommunities = () => {
    return async (dispatch: Dispatch<CommunitiesAction>): Promise<void> => {
        dispatch({
            type: CommunitiesActionType.LOAD_COMMUNITIES_ATTEMPT,
        });
        try {
            const token = Cookies.get('token');
            const response = await fetch(`${API_URL}/user/communities`, {
                method: 'GET',
                headers: headers(token),
            });
            const { error, data } = await response.json();
            if (!response.ok) {
                throw new Error(error);
            }
            console.log('DATA LOAD COMMUITIES', data);
            dispatch({
                type: CommunitiesActionType.LOAD_COMMUNITIES_SUCCESS,
                payload: data,
            });
        } catch (err) {
            dispatch({
                type: CommunitiesActionType.LOAD_COMMUNITIES_ERROR,
                payload: `An error has occured ${err}`,
            });
        }
    };
};

export const cleanCommunities = () => {
    return async (dispatch: Dispatch<CommunitiesAction>): Promise<void> => {
        dispatch({
            type: CommunitiesActionType.DELETE_INFOS,
        });
    };
};
