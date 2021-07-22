import { AuthenticateFailAction, AuthenticateSuccessAction, LoadCurrentUserAction, LogoutAction } from './authAction';

export enum AuthActionTypes {
    authenticateSuccess,
    authenticateFail,
    loadCurrentUser,
    logout,
}

export type AuthAction = AuthenticateSuccessAction | AuthenticateFailAction | LoadCurrentUserAction | LogoutAction;
