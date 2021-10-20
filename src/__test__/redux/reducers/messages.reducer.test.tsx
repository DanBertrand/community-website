import messagesReducer, { MessageStateType } from 'store/reducers/messagesReducer';
import { MessagesAction } from 'store/actions';
import { MessagesActionType } from 'store/types';
import { message } from '__test__/___mock___/data';

const initialState: MessageStateType = {
    messages: [],
};

describe('Messages Reducer', () => {
    it('should return the initial state', () => {
        expect(messagesReducer(initialState, {} as MessagesAction)).toEqual(initialState);
    });

    it('should handle DISPLAY_SUCCESS_MESSAGE ', () => {
        expect(
            messagesReducer(initialState, {
                type: MessagesActionType.DISPLAY_SUCCESS_MESSAGE,
                payload: message.success,
            }),
        ).toEqual({
            messages: [{ content: message.success, color: 'green' }],
        });
    });
    it('should handle DISPLAY_ERROR_MESSAGE ', () => {
        expect(
            messagesReducer(initialState, {
                type: MessagesActionType.DISPLAY_ERROR_MESSAGE,
                payload: message.error,
            }),
        ).toEqual({
            messages: [
                {
                    content: message.error,
                    color: 'red',
                },
            ],
        });
    });
    it('should handle REMOVE_MESSAGE ', () => {
        expect(
            messagesReducer(
                {
                    messages: [
                        { content: 'I want to REMOVE this one', color: 'brown' },
                        { content: 'I want to KEEP this one', color: 'green' },
                    ],
                },
                {
                    type: MessagesActionType.REMOVE_MESSAGE,
                    payload: 'I want to REMOVE this one',
                },
            ),
        ).toEqual({
            messages: [{ content: 'I want to KEEP this one', color: 'green' }],
        });
    });
});
