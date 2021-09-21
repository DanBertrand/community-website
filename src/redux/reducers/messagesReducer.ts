import { MessagesAction } from '../actions';
import { MessagesActionType } from '../types';
// import { UserCommunity } from '../types/communitiesTypes';

export type MessageStateType = {
    color: string;
    message: string;
};

const initialState: MessageStateType = {
    color: '',
    message: '',
};

const communitiesReducer = (state = initialState, action: MessagesAction): MessageStateType => {
    console.log('COMMUNITY REDUCER', action);
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

export default communitiesReducer;
