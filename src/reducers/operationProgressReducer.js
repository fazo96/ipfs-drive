import {
  SET_CONTENT,
  ADD,
  REMOVE,
  RENAME,
  FETCH_CONTENT
} from '../constants/actionTypes';
import initialState from './initialState';

export default function operationProgressReducer(state = initialState.currentOperation, action){

  switch (action.type) {

    case FETCH_CONTENT:
    case ADD:
    case REMOVE:
    case RENAME:
      return Object.assign({}, state, { active: true });

    case SET_CONTENT:
      return Object.assign({}, state, { active: false });

    default: return state;

  }
}
