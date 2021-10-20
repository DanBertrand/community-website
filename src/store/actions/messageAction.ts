import { MessagesActionType } from '../types';

interface DisplaySuccessMessage {
    type: MessagesActionType.DISPLAY_SUCCESS_MESSAGE;
    payload: string;
}

interface DisplayErrorMessage {
    type: MessagesActionType.DISPLAY_ERROR_MESSAGE;
    payload: string;
}

interface RemoveMessage {
    type: MessagesActionType.REMOVE_MESSAGE;
    payload: string;
}

export type MessagesAction = DisplaySuccessMessage | DisplayErrorMessage | RemoveMessage;
