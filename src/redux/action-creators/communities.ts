import { Dispatch } from 'redux';
import { CommunitiesActionType } from '../types';
import { CommunitiesAction } from '../actions';
import { headers } from '../../tools/api';
import Cookies from 'js-cookie';

const API_URL = process.env.REACT_APP_API_URL;

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
            dispatch({
                type: CommunitiesActionType.LOAD_COMMUNITIES_SUCCESS,
                payload: data,
            });
        } catch (err) {
            dispatch({
                type: CommunitiesActionType.LOAD_COMMUNITIES_ERROR,
                payload: err.message,
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
