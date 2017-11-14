import {
  ADDFILE_MODAL_CLOSE,
  ADDFILE_MODAL_OPEN,
  ADDING_FILE
} from '../constants/actionTypes';
import initialState from './initialState';

export default function addModalReducer(state = initialState.addModal, action) {
  let newState = Object.assign({}, state);

  switch (action.type) {
    case ADDFILE_MODAL_OPEN:
      newState.open = true;
      return newState;

    case ADDFILE_MODAL_CLOSE:
      newState.open = false;
      return newState;

    case ADDING_FILE:
      newState.open = false;
      return newState;

    default:
      return state;
  }
}
