import { RegisterSuccessAction, RegisterFailAction } from './authAction';

export enum ActionTypes {
    registerSuccess,
    registerFail,
}

export type Action = RegisterSuccessAction | RegisterFailAction;
