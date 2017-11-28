import {
  SET_CONTENT,
  UPDATE_PATH_INFO,
  ADD,
  REMOVE,
  RENAME,
  CUT,
  COPY,
  PASTE,
  SHARE,
  CLEAR_NOTIFICATION,
  LINK_ANALYSIS,
  FETCH_CONTENT,
  ANALYZE_LINK
} from '../constants/actionTypes';
import initialState from './initialState';
import { pathToArrayOfObjects } from '../utils/path';

export default function ipfsReducer(state = initialState.ipfs, action) {
  let newState = Object.assign({}, state);

  switch (action.type) {
    case ADD:
    case REMOVE:
    case RENAME:
      newState.loading = true;
      return newState;

    case CUT:
    case COPY:
      newState.clipboardItem = action.item;
      return newState;

    case PASTE:
      newState.clipboardItem = null;
      return newState;

    case SHARE:
      newState.notification = {
        open: true,
        message: 'Link copied to clipboard'
      };
      return newState;

    case CLEAR_NOTIFICATION:
      newState.notification = Object.assign({}, initialState.ipfs.notification);
      return newState;

    case ANALYZE_LINK:
      newState.files = newState.files.map(f => {
        if (f.hash === action.item.hash) {
          return Object.assign({}, f, { analyzing: true });
        }
        return f;
      });
      return newState;

    case LINK_ANALYSIS:
      newState.files = newState.files.map(f => {
        if (f.hash === action.item.hash) {
          return Object.assign({}, f, action.item, { analyzing: false });
        }
        return f;
      });
      newState.path = state.path.map(f => {
        if (f.hash === action.item.hash) {
          return Object.assign({}, f, action.item);
        }
        return f;
      });
      return newState;

    case FETCH_CONTENT:
      newState.loading = true;
      newState.files = [];
      return newState;

    case SET_CONTENT:
      newState.files = action.files;
      newState.loading = false;
      return newState;

    case '@@router/LOCATION_CHANGE':
      if (action.payload.pathname.indexOf('/ipfs/') === 0) {
        newState.path = pathToArrayOfObjects(action.payload.pathname);
      }
      return newState;

    case UPDATE_PATH_INFO:
      newState.path = state.path.map((p, i) => Object.assign({}, p, action.path[i]));
      return newState;

    default:
      return state;
  }
}
