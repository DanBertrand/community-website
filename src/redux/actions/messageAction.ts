import { MessagesActionType } from '../types';

interface DisplaySuccessMessage {
    type: MessagesActionType.DISPLAY_SUCCESS_MESSAGE;
    payload: string;
}

interface DisplayErrorMessage {
    type: MessagesActionType.DISPLAY_ERROR_MESSAGE;
    payload: string;
}

interface CleanMessage {
    type: MessagesActionType.REMOVE_MESSAGE;
}

export type MessagesAction = DisplaySuccessMessage | DisplayErrorMessage | CleanMessage;
