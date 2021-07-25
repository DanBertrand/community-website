import { Dispatch } from 'redux';
import { flashError, flashSuccess, removeFlash } from './flashAction';
import { ShowFlashAction, RemoveFlashAction } from './flashAction';

export const displaySuccess = (message: string): any => {
    return (dispatch: Dispatch<ShowFlashAction> & Dispatch<RemoveFlashAction>): void => {
        dispatch(flashSuccess(message));
        setTimeout(() => {
            dispatch(removeFlash());
        }, 6000);
    };
};

export const displayError = (message: string): any => {
    return (dispatch: Dispatch<ShowFlashAction> & Dispatch<RemoveFlashAction>): void => {
        dispatch(flashError(message));
        setTimeout(() => {
            dispatch(removeFlash());
        }, 6000);
    };
};
