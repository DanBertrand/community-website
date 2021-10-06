import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { AuthActionType, MessagesActionType } from 'store/types';
import { mockFetch, testToken } from '../../../___mock___/fetch';
import Cookie from 'js-cookie';
import { signup } from '../../../../store/action-creators/authentications';

const mockStore = configureMockStore([thunk]);
let reduxStore = mockStore({});
const userData = { email: 'email@email.com', password: 'pass1234' };

describe('Sign Up', () => {
    describe('When receive response OK ', () => {
        const mockResponse = {
            message: "Account couldn't be created successfully. ",
            data: { user: { id: 1, email: 'Dan' } },
        };
        beforeEach(() => {
            Cookie.remove('token');
            reduxStore = mockStore({});
            mockFetch(mockResponse, true, true);
        });
        afterEach(() => {
            jest.clearAllMocks();
            jest.resetAllMocks();
        });

        const expectedActions = [
            { type: AuthActionType.SIGNUP_ATTEMPT },
            { type: AuthActionType.SIGNUP_SUCCESS, payload: mockResponse.data },
            { type: MessagesActionType.DISPLAY_SUCCESS_MESSAGE, payload: mockResponse.message },
        ];

        test('should create an action SIGNUP_ATTEMPT, SIGNUP_SUCCESS, DISPLAY_SUCCESS_MESSAGE and call fetch 1 time', async () => {
            await reduxStore.dispatch(signup(userData) as any);
            expect(reduxStore.getActions()).toEqual(expectedActions);
            expect(fetch).toHaveBeenCalledTimes(1);
        });

        test('should store token into Cookies', async () => {
            await reduxStore.dispatch(signup(userData) as any);
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(reduxStore.getActions()).toEqual(expectedActions);
            expect(Cookie.get('token')).toEqual(testToken.split(' ')[1]);
        });
    });

    describe('When receive response not OK', () => {
        beforeEach(async () => {
            Cookie.remove('token');
            reduxStore = mockStore({});
            mockFetch(mockResponse, false, false);
            await reduxStore.dispatch(signup(userData) as any);
        });
        afterEach(() => {
            jest.resetAllMocks();
        });

        const mockResponse = { message: 'An error occurred', data: { user: { id: 1, email: 'Dan' } } };
        const expectedActions = [
            { type: AuthActionType.SIGNUP_ATTEMPT },
            { type: AuthActionType.SIGNUP_ERROR, payload: mockResponse.message },
            { type: MessagesActionType.DISPLAY_ERROR_MESSAGE, payload: mockResponse.message },
        ];

        test('should create an action SIGNUP_ATTEMPT, SIGNUP_ERROR, DISPLAY_ERROR_MESSAGE and call fetch 1 time', async () => {
            expect(reduxStore.getActions()).toEqual(expectedActions);
            expect(fetch).toHaveBeenCalledTimes(1);
        });
        test('should NOT store token into Cookies and call fetch 1 time', async () => {
            expect(reduxStore.getActions()).toEqual(expectedActions);
            expect(Cookie.get('token')).toBe(undefined);
            expect(fetch).toHaveBeenCalledTimes(1);
        });
    });
});
