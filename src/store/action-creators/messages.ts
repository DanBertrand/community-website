import { MessagesActionType } from '../types';
import { MessagesAction } from '../actions';
import { Dispatch } from 'redux';

export const displaySuccess = (message: string) => {
    return async (dispatch: Dispatch<MessagesAction>): Promise<void> => {
        dispatch({
            type: MessagesActionType.DISPLAY_SUCCESS_MESSAGE,
            payload: message,
        });
    };
};

export const displayError = (message: string) => {
    return async (dispatch: Dispatch<MessagesAction>): Promise<void> => {
        dispatch({
            type: MessagesActionType.DISPLAY_ERROR_MESSAGE,
            payload: message,
        });
    };
};

export const removeMessage = (message: string) => {
    return async (dispatch: Dispatch<MessagesAction>): Promise<void> => {
        dispatch({
            type: MessagesActionType.REMOVE_MESSAGE,
            payload: message,
        });
    };
};
