import { MessagesAction } from '../actions';
import { MessagesActionType } from '../types';

export type MessageStateType = {
    color: string;
    message: string;
};

const initialState: MessageStateType = {
    color: '',
    message: '',
};

const massagesReducer = (state = initialState, action: MessagesAction): MessageStateType => {
    switch (action.type) {
        case MessagesActionType.DISPLAY_SUCCESS_MESSAGE:
            return {
                message: action.payload,
                color: 'green',
            };
        case MessagesActionType.DISPLAY_ERROR_MESSAGE:
            return {
                message: action.payload,
                color: 'red',
            };
        case MessagesActionType.REMOVE_MESSAGE:
            return {
                message: '',
                color: '',
            };
        default:
            return state;
    }
};

export default massagesReducer;
