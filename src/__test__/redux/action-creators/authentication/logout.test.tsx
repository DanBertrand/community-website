import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { AuthActionType, MessagesActionType } from 'store/types';
import { logout } from 'store/action-creators';
import { mockFetch } from '../../../___mock___/fetch';
import Cookie from 'js-cookie';

const mockStore = configureMockStore([thunk]);
let reduxStore = mockStore({});

describe('Logout', () => {
    describe('When receive response OK ', () => {
        const mockResponse = { message: 'Logged out successfully' };
        beforeEach(() => {
            reduxStore = mockStore({});
            mockFetch(mockResponse, true, true);
        });
        afterEach(() => {
            jest.resetAllMocks();
            Cookie.remove('token');
        });

        const expectedActions = [
            { type: AuthActionType.LOGOUT },
            { type: MessagesActionType.DISPLAY_SUCCESS_MESSAGE, payload: mockResponse.message },
        ];

        test('should create an action LOGOUT, DISPLAY_SUCCESS_MESSAGE and call fetch 1 time', async () => {
            await reduxStore.dispatch(logout() as any);
            expect(reduxStore.getActions()).toEqual(expectedActions);
            expect(fetch).toHaveBeenCalledTimes(1);
        });

        test('should remove token from Cookies', async () => {
            await reduxStore.dispatch(logout() as any);
            const token = Cookie.get('token');
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(reduxStore.getActions()).toEqual(expectedActions);
            expect(token).toBe(undefined);
        });
    });

    describe('When receive response not OK', () => {
        beforeEach(async () => {
            reduxStore = mockStore({});
            mockFetch(mockResponse, false, true);
            await reduxStore.dispatch(logout() as any);
        });
        afterEach(() => {
            jest.resetAllMocks();
            Cookie.remove('token');
        });

        const mockResponse = { message: 'Logged out successfully' };
        const expectedActions = [
            { type: AuthActionType.LOGOUT },
            { type: MessagesActionType.DISPLAY_SUCCESS_MESSAGE, payload: mockResponse.message },
        ];

        test('should create an action LOGOUT, DISPLAY_SUCCESS_MESSAGE and call fetch 1 time', async () => {
            expect(reduxStore.getActions()).toEqual(expectedActions);
            expect(fetch).toHaveBeenCalledTimes(1);
        });
        test('should remove token from cookies too', async () => {
            const token = Cookie.get('token');
            expect(reduxStore.getActions()).toEqual(expectedActions);
            expect(token).toBe(undefined);
            expect(fetch).toHaveBeenCalledTimes(1);
        });
    });
});
