import messagesReducer, { MessageStateType } from 'store/reducers/messagesReducer';
import { MessagesActionType } from 'store/types';
import { message } from '__test__/___mock___/data';

const initialState: MessageStateType = {
    color: '',
    message: '',
};

describe('Messages Reducer', () => {
    it('should return the initial state', () => {
        expect(messagesReducer(initialState, {} as any)).toEqual(initialState);
    });

    it('should handle DISPLAY_SUCCESS_MESSAGE ', () => {
        expect(
            messagesReducer(initialState, {
                type: MessagesActionType.DISPLAY_SUCCESS_MESSAGE,
                payload: 'Successful action',
            }),
        ).toEqual({
            message: message.success,
            color: 'green',
        });
    });
    it('should handle DISPLAY_ERROR_MESSAGE ', () => {
        expect(
            messagesReducer(initialState, {
                type: MessagesActionType.DISPLAY_ERROR_MESSAGE,
                payload: message.error,
            }),
        ).toEqual({
            message: message.error,
            color: 'red',
        });
    });
    it('should handle REMOVE_MESSAGE ', () => {
        expect(
            messagesReducer(initialState, {
                type: MessagesActionType.REMOVE_MESSAGE,
            }),
        ).toEqual({
            color: '',
            message: '',
        });
    });
});
