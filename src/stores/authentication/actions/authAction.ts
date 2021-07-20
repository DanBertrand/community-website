// import * as actionTypes from '../authTypes';
import { ActionTypes } from './types';

export type Data = {
    token: string;
    id: number;
    email: string;
};

export type RegisterSuccessAction = {
    type: ActionTypes.registerSuccess;
    payload: Data;
};

export type RegisterFailAction = {
    type: ActionTypes.registerFail;
};

export const registerSuccess = (data: Data): RegisterSuccessAction => {
    return {
        type: ActionTypes.registerSuccess,
        payload: data,
    };
};

export const registerFail = (): RegisterFailAction => {
    return {
        type: ActionTypes.registerFail,
    };
};
