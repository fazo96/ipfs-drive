import {
  ROUTER_LOCATION_CHANGE,
  UPDATE_PATH_INFO,
  LINK_ANALYSIS
} from '../constants/actionTypes';
import initialState from './initialState';
import { pathToArrayOfObjects } from '../utils/path';

export default function pathReducer(path = initialState.path, action){
  switch (action.type) {

  case ROUTER_LOCATION_CHANGE:
    if (action.payload.pathname.indexOf('/ipfs/') === 0) {
      return pathToArrayOfObjects(action.payload.pathname);
    }
    return path;

  case UPDATE_PATH_INFO:
    return path.map((p, i) => Object.assign({}, p, action.path[i]));

  case LINK_ANALYSIS:
    return path.map(f => {
      if (f.hash === action.item.hash) {
        return Object.assign({}, f, action.item);
      }
      return f;
    });

  default: return path;

  }
}
