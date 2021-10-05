import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { AuthActionType, MessagesActionType } from 'store/types';
import { login } from 'store/action-creators';

const mockStore = configureMockStore([thunk]);
const initialState = { user: null, errorMessage: '', isLoading: false };

describe('Login Middleware', () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });
    it('should create an action to start the fetch of a random fact and another action to mark the success of the fetch', async () => {
        const reduxStore = mockStore({});
        const mockResponse = { message: 'Logged in successfully', data: { user: { id: 1, email: 'Dan' } } };
        const expectedActions = [
            { type: AuthActionType.LOGIN_ATTEMPT },
            { type: AuthActionType.LOGIN_SUCCESS, payload: mockResponse.data },
            { type: MessagesActionType.DISPLAY_SUCCESS_MESSAGE, payload: mockResponse.message },
        ];

        const globalRef: any = global;
        globalRef.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                headers: {
                    get: (string: string) => (string === 'authorization' ? '54s4vKIKB=78fdsfdgfgdfgh' : undefined),
                },
                json: () => Promise.resolve(mockResponse),
            }),
        );

        await reduxStore.dispatch(login({ email: 'email@email.com', password: 'pass1234' }) as any);

        expect(globalRef.fetch).toHaveBeenCalledTimes(1);
        expect(reduxStore.getActions()).toEqual(expectedActions);
    });
});

// payload: {
//         id: 1,
//         email: 'dan@gmail.com',
//         confirmation_token: '541861-df5f1d',
//         confirmed_at: null,
//         confirmation_sent_at: '2021-10-21',
//         first_name: 'Dan',
//         last_name: 'Bertrand',
//         has_communities: false,
//         jobs: [],
//         workshops: [],
//         avatar: { id: 1, url: 'cloudinary.com', public_id: '165fsdfg4gdfbg' },
//     },
