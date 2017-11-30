import {
  FETCH_CONTENT,
  SET_CONTENT,
  ANALYZE_LINK,
  LINK_ANALYSIS
} from '../constants/actionTypes';
import initialState from './initialState';

export default function filesReducer(files = initialState.files, action){

  switch (action.type) {

    case FETCH_CONTENT:
      return [];

    case SET_CONTENT:
      return [ ...action.files ];

    case LINK_ANALYSIS:
      return files.map(f => {
        if (f.hash === action.item.hash) {
          return Object.assign({}, f, action.item, { analyzing: false });
        }
        return f;
      });

    case ANALYZE_LINK:
      return files.map(f => {
        if (f.hash === action.item.hash) {
          return Object.assign({}, f, { analyzing: true });
        }
        return f;
      });

      default: return files;

  }
}
