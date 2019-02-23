import { NOTIFY } from '../constants/actionTypes';

export function notifyError(message) {
  return {
    type: NOTIFY,
    message,
  };
}
