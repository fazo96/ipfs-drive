import {
  CUT,
  COPY,
  CLEAR_CLIPBOARD,
} from '../constants/actionTypes';
import initialState from './initialState';

export default function clipboardReducer(state = initialState.clipboard, action) {
  switch (action.type) {
    case CUT:
    case COPY:
      return action.item;

    case CLEAR_CLIPBOARD:
      return null;

    default:
      return state;
  }
}
