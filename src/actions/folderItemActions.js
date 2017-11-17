import * as types from '../constants/actionTypes';
import { addLinkFromHash, removeLink } from './ipfsWriteActions';

export function share(item) {
  return {
    type: types.SHARE,
    item
  };
}

export function cut(item) {
  return async function(dispatch) {
    await dispatch(removeLink(item.name));
    dispatch({ type: types.CUT, item });
  };
}

export function copy(item) {
  return {
    type: types.COPY,
    item
  };
}

export function paste() {
  return async function(dispatch, getState) {
    const item = getState().ipfs.clipboardItem;
    await dispatch(addLinkFromHash(item.name, item.hash));
    dispatch({ type: types.PASTE, item });
  };
}

