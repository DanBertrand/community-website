import authReducer from 'store/reducers/authReducer';
import { AuthActionType } from 'store/types';
import { user, message } from '../../___mock___/data';

const initialState = {
    user: null,
    errorMessage: '',
    isLoading: false,
};

describe('Authentication Reducer', () => {
    it('should return the initial state', () => {
        expect(authReducer(initialState, {} as any)).toEqual(initialState);
    });
    it('should handle LOGIN_ATTEMPT', () => {
        expect(authReducer(initialState, { type: AuthActionType.LOGIN_ATTEMPT })).toEqual({
            ...initialState,
            isLoading: true,
        });
    });
    it('should handle SIGNUP_ATTEMPT', () => {
        expect(authReducer(initialState, { type: AuthActionType.SIGNUP_ATTEMPT })).toEqual({
            ...initialState,
            isLoading: true,
        });
    });
    it('should handle LOAD_USER_SUCCESS', () => {
        expect(authReducer(initialState, { type: AuthActionType.LOAD_USER_SUCCESS, payload: user })).toEqual({
            ...initialState,
            user: user,
            isLoading: false,
        });
    });
    it('should handle SIGNUP_SUCCESS', () => {
        expect(authReducer(initialState, { type: AuthActionType.SIGNUP_SUCCESS, payload: user })).toEqual({
            ...initialState,
            user: user,
            isLoading: false,
        });
    });
    it('should handle LOGIN_SUCCESS', () => {
        expect(authReducer(initialState, { type: AuthActionType.LOGIN_SUCCESS, payload: user })).toEqual({
            ...initialState,
            user: user,
            isLoading: false,
        });
    });
    it('should handle SIGNUP_ERROR', () => {
        expect(authReducer(initialState, { type: AuthActionType.SIGNUP_ERROR, payload: message.error })).toEqual({
            ...initialState,
            user: null,
            isLoading: false,
            errorMessage: message.error,
        });
    });
    it('should handle LOGIN_ERROR', () => {
        expect(authReducer(initialState, { type: AuthActionType.LOGIN_ERROR, payload: message.error })).toEqual({
            ...initialState,
            user: null,
            isLoading: false,
            errorMessage: message.error,
        });
    });

    it('should handle LOAD_USER_ERROR', () => {
        expect(authReducer(initialState, { type: AuthActionType.LOAD_USER_ERROR, payload: message.error })).toEqual({
            ...initialState,
            user: null,
            isLoading: false,
            errorMessage: message.error,
        });
    });
    it('should handle LOGOUT', () => {
        expect(authReducer(initialState, { type: AuthActionType.LOGOUT })).toEqual(initialState);
    });
});
