import * as types from '../constants/actionTypes';

export function share(item) {
  return {
    type: types.SHARE,
    ...item
  };
}

export function cut(item) {
  return {
    type: types.CUT,
    ...item
  };
}

export function copy(item) {
  return {
    type: types.COPY,
    ...item
  };
}

export function paste(item) {
  return {
    type: types.PASTE,
    ...item
  };
}

