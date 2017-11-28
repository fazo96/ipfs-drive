import * as types from '../constants/actionTypes';

export function add(item) {
  return {
    type: types.ADD,
    item
  };
}

export function removeLink(name) {
  return {
    type: types.REMOVE,
    name
  };
}

export function renameLink(name, newName) {
  return {
    type: types.RENAME,
    name,
    newName
  };
}
