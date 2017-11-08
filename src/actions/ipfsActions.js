import * as types from '../constants/actionTypes';

export function changeFiles(files) {
  return {
    type: types.CHANGE_FILES,
    files
  };
}
