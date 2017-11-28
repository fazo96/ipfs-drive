import * as types from '../constants/actionTypes';
import { removeLink, renameLink } from './ipfsWriteActions';

export function share(item) {
  return {
    type: types.SHARE,
    item
  };
}

export function cut(item) {
  return { type: types.CUT, item };
}

export function copy(item) {
  return {
    type: types.COPY,
    item
  };
}

export function paste() {
  return { type: types.PASTE };
}

export function remove(item) {
  return removeLink(item.name);
}

export function rename(item, newName) {
  return renameLink(item, newName);
}
