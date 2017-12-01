import {
  ROUTER_LOCATION_CHANGE,
  UPDATE_PATH_INFO,
  LINK_ANALYSIS
} from '../constants/actionTypes';
import initialState from './initialState';
import { pathToArrayOfObjects } from '../utils/path';
import { updateSingleItem, updateWholeArray } from './common/itemArrayUtils';

export default function pathReducer(path = initialState.path, action){
  switch (action.type) {

  case ROUTER_LOCATION_CHANGE:
    if (action.payload.pathname.indexOf('/ipfs/') === 0) {
      return pathToArrayOfObjects(action.payload.pathname);
    }
    return path;

  case UPDATE_PATH_INFO:
    return updateWholeArray(path, action.path);

  case LINK_ANALYSIS:
    return updateSingleItem(path, action.item);

  default: return path;

  }
}
