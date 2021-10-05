import configureStore from 'redux-mock-store';
import { AuthActionType } from 'store/types';
import { userData, userDataReducer } from '../../fixtures/Authentication/Authentication.data';
import { useActions } from 'hooks';
import { AuthAction, MessagesAction } from 'store/actions';
import { Dispatch } from 'redux';

describe('Authenticate user actions ', () => {
    const mockStore = configureStore();
    const reduxStore = mockStore();

    beforeEach(() => {
        reduxStore.clearActions();
    });
    describe('LOGIN_ATTEMPT', () => {
        it('should dispatch the LOGIN_ATTEMPT action', () => {
            // const { login } = useActions();

            const expectedAction = [
                {
                    type: AuthActionType.LOGIN_ATTEMPT,
                },
            ];
            reduxStore.dispatch({
                type: AuthActionType.LOGIN_ATTEMPT,
            });

            expect(reduxStore.getActions()).toEqual(expectedAction);
        });
    });

    describe('LOGIN_SUCCESS', () => {
        it('should dispatch the LOGIN_SUCCESS action', () => {
            // const { login } = useActions();

            const expectedAction = [
                {
                    payload: userData,
                    type: AuthActionType.LOGIN_SUCCESS,
                },
            ];
            reduxStore.dispatch({
                payload: userData,
                type: AuthActionType.LOGIN_SUCCESS,
            });

            expect(reduxStore.getActions()).toEqual(expectedAction);
        });
    });
});
