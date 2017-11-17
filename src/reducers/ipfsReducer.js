import {
  CHANGE_FILES,
  CHANGE_DIRECTORY,
  SET_PATH,
  CUT,
  COPY,
  PASTE
} from '../constants/actionTypes';
import initialState from './initialState';

export default function ipfsReducer(state = initialState.ipfs, action) {
  const howDeep = state.path.length;
  let newState = Object.assign({}, state);

  switch (action.type) {
    case CUT:
    case COPY:
      newState.clipboardItem = action.item;
      return newState;

    case PASTE:
      newState.clipboardItem = null;
      return newState;

    case CHANGE_FILES:
      newState.files = action.files;
      newState.loading = false;
      return newState;

    case CHANGE_DIRECTORY:
      if (action.to === '..') {
        if (howDeep > 1) {
          newState.path = state.path.slice(0, howDeep - 1);
          newState.loading = true;
        }
      } else if (action.to !== '.') {
        const filenames = state.files.map(f => f.name);
        const index = filenames.indexOf(action.to);
        if (index >= 0) {
          const hash = state.files[index].hash;
          newState.path = state.path.concat({
            name: action.to,
            hash: hash
          });
          newState.loading = true;
        }
      }
      return newState;

    case SET_PATH:
      newState.path = Array.isArray(action.path) ? action.path : [action.path];
      newState.loading = true;

      return newState;

    default:
      return state;
  }
}
