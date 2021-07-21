import { AuthenticateFailAction, AuthenticateSuccessAction, LoadCurrentUserAction, LogoutAction } from './authAction';

export enum ActionTypes {
    authenticateSuccess,
    authenticateFail,
    loadCurrentUser,
    logout,
}

export type Action = AuthenticateSuccessAction | AuthenticateFailAction | LoadCurrentUserAction | LogoutAction;
