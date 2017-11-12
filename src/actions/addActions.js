import * as types from '../constants/actionTypes';

export function openModal() {
  return {
    type: types.ADDFILE_MODAL_OPEN
  };
}

export function closeModal() {
  return {
    type: types.ADDFILE_MODAL_CLOSE
  };
}
