import { MessagesAction } from '../actions';
import { MessagesActionType } from '../types';

export type MessageStateType = {
    messages: Message[];
};

export type Message = {
    content: string;
    color: string;
};

const initialState: MessageStateType = {
    messages: [],
};

const massagesReducer = (state = initialState, action: MessagesAction): MessageStateType => {
    switch (action.type) {
        case MessagesActionType.DISPLAY_SUCCESS_MESSAGE:
            return {
                messages: [...state.messages, { content: action.payload, color: 'green' }],
            };
        case MessagesActionType.DISPLAY_ERROR_MESSAGE:
            return {
                messages: [...state.messages, { content: action.payload, color: 'red' }],
            };
        case MessagesActionType.REMOVE_MESSAGE:
            return {
                messages: state.messages.filter((msg) => msg.content != action.payload),
            };
        default:
            return state;
    }
};

export default massagesReducer;
