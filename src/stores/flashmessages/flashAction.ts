import { FLASH_ERROR, FLASH_OUT, FLASH_SUCCESS } from './flashActionTypes';

export type ShowFlashAction = {
    type: string;
    category: string;
    content: string;
    color: string;
};

export type RemoveFlashAction = {
    type: string;
};

export const flashSuccess = (message: string): ShowFlashAction => {
    return {
        type: FLASH_SUCCESS,
        category: 'success',
        content: message,
        color: 'green',
    };
};

export const flashError = (message: string): ShowFlashAction => {
    return {
        type: FLASH_ERROR,
        category: 'danger',
        content: message,
        color: 'red',
    };
};

export const removeFlash = (): RemoveFlashAction => {
    return {
        type: FLASH_OUT,
    };
};
