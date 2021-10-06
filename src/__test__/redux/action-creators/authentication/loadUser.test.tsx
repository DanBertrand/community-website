import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { AuthActionType } from 'store/types';
import { loadUser } from 'store/action-creators';
import { mockFetch, testToken } from '../../../___mock___/fetch';
import Cookie from 'js-cookie';

const mockStore = configureMockStore([thunk]);
let reduxStore = mockStore({});

describe('Load User', () => {
    describe('When token is found and receive response OK ', () => {
        const mockResponse = { message: 'Logged in successfully', data: { user: { id: 1, email: 'Dan' } } };
        beforeEach(() => {
            Cookie.set('token', testToken.split(' ')[1]);
            reduxStore = mockStore({});
            mockFetch(mockResponse, true, true);
        });
        afterEach(() => {
            Cookie.remove('token');
            jest.resetAllMocks();
        });

        const expectedActions = [
            { type: AuthActionType.LOAD_USER_ATTEMPT },
            { type: AuthActionType.LOAD_USER_SUCCESS, payload: mockResponse.data },
        ];

        test('should create an action LOAD_USER_ATTEMPT, LOAD_USER_SUCCESS, DISPLAY_SUCCESS_MESSAGE and call fetch 1 time', async () => {
            await reduxStore.dispatch(loadUser() as any);
            expect(reduxStore.getActions()).toEqual(expectedActions);
            expect(fetch).toHaveBeenCalledTimes(1);
        });

        test('should store token into Cookies', async () => {
            await reduxStore.dispatch(loadUser() as any);
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(reduxStore.getActions()).toEqual(expectedActions);
            expect(Cookie.get('token')).toEqual(testToken.split(' ')[1]);
        });
    });

    describe('When token is not found', () => {
        beforeEach(async () => {
            Cookie.remove('token');
            reduxStore = mockStore({});
            mockFetch(mockResponse, false, false);
            await reduxStore.dispatch(loadUser() as any);
        });
        afterEach(() => {
            jest.resetAllMocks();
        });

        const mockResponse = { message: 'An error occurred', data: { user: { id: 1, email: 'Dan' } } };
        const expectedActions = [{ type: AuthActionType.LOAD_USER_ATTEMPT }];

        test('should only create action LOAD_USER_ATTEMPT and return with no fetching', async () => {
            expect(reduxStore.getActions()).toEqual(expectedActions);
            expect(fetch).toHaveBeenCalledTimes(0);
        });
    });

    describe('When token is found but receive response not OK', () => {
        beforeEach(async () => {
            Cookie.set('token', testToken.split(' ')[1]);
            reduxStore = mockStore({});
            mockFetch(mockResponse, false, true);
            await reduxStore.dispatch(loadUser() as any);
        });
        afterEach(() => {
            Cookie.remove('token');
            jest.resetAllMocks();
        });

        const mockResponse = { message: 'An error occurred', data: { user: { id: 1, email: 'Dan' } } };
        const expectedActions = [
            { type: AuthActionType.LOAD_USER_ATTEMPT },
            { type: AuthActionType.LOAD_USER_ERROR, payload: mockResponse.message },
        ];

        test('should create an action LOAD_USER_ATTEMPT, LOAD_USER_ERROR and call fetch 1 time', async () => {
            expect(reduxStore.getActions()).toEqual(expectedActions);
            expect(fetch).toHaveBeenCalledTimes(1);
        });
        test('should NOT store token into Cookies and call fetch 1 time', async () => {
            expect(reduxStore.getActions()).toEqual(expectedActions);

            expect(fetch).toHaveBeenCalledTimes(1);
        });
    });
});
