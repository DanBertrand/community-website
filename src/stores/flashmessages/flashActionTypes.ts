import { ShowFlashAction, RemoveFlashAction } from './flashAction';

export const FLASH_SUCCESS = 'FLASH_SUCCESS';
export const FLASH_INFO = 'FLASH_INFO';
export const FLASH_WARNING = 'FLASH_WARNING';
export const FLASH_ERROR = 'FLASH_ERROR';
export const FLASH_OUT = 'FLASH_OUT';

export type FlashAction = ShowFlashAction & RemoveFlashAction;
