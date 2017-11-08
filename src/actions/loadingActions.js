import * as types from '../constants/actionTypes';

export function startLoading() {
  return {
    type: types.START_LOADING
  };
}

export function doneLoading() {
  return {
    type: types.DONE_LOADING
  };
}
