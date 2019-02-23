import * as types from '../constants/actionTypes';

export function clearNotification() {
  return {
    type: types.CLEAR_NOTIFICATION,
  };
}
