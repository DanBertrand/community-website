import { FlashAction } from './flashActionTypes';
import { FLASH_ERROR, FLASH_OUT, FLASH_SUCCESS } from './flashActionTypes';

export type FlashStateType = {
    display: boolean;
    category: string;
    content: string;
};

const initialState = {
    display: false,
    category: '',
    content: '',
};

const flashReducer = (state: FlashStateType = initialState, action: FlashAction): FlashStateType => {
    switch (action.type) {
        case FLASH_SUCCESS:
        case FLASH_ERROR:
            return {
                ...state,
                display: true,
                category: action.category,
                content: action.content,
            };
        case FLASH_OUT:
            return {
                ...state,
                display: false,
                category: '',
                content: '',
            };
        default:
            return state;
    }
};

export default flashReducer;
