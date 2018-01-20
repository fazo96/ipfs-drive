import {
  FETCH_CONTENT,
  SET_CONTENT,
  ANALYZE_LINK,
  LINK_ANALYSIS
} from '../constants/actionTypes';
import initialState from './initialState';
import { updateSingleItem } from './common/itemArrayUtils';

export default function filesReducer(files = initialState.files, action){

  switch (action.type) {

    case FETCH_CONTENT:
      return [];

    case SET_CONTENT:
      return [ ...action.files ];

    case LINK_ANALYSIS:
      return updateSingleItem(files, action.item);

    case ANALYZE_LINK:
      return updateSingleItem(files, { hash: action.item.hash, analyzing: true });

      default: return files;

  }
}
