

import {
  NOTIFY,
  CLEAR_NOTIFICATION,
  SHARE
} from '../constants/actionTypes';
import initialState from './initialState';

export default function notificationReducer(state = initialState.notification, action){

  switch (action.type) {
    case CLEAR_NOTIFICATION:
      return Object.assign({}, initialState.notification);

    case SHARE:
      return {
        open: true,
        message: 'Link copied to clipboard'
      };

    case NOTIFY:
      return {
        open: true,
        message: action.message
      };

    default:
      return state;
  }
}
