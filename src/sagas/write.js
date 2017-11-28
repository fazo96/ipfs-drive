import * as types from '../constants/actionTypes';
import {
  buildNewPath,
  createItem,
  addItemToDirectory,
  removeLink,
  renameLink
} from '../utils/ipfs';
import { call, put, select } from 'redux-saga/effects';
import { setPath } from '../actions/ipfsNavigateActions';

export function* watchAdd(action){
  const { item } = action;
  let newItem;
  // Prepare item
  if (item.hash) {
    newItem = item;
  } else if (item.content) {
    const buffer = Buffer.from(item.content);
    newItem = yield call(createItem, item.name, buffer);
  } else {
    newItem = yield call(createItem, item.name);
  }
  // Prepare path info
  const state = yield select();
  const currentPath = state.ipfs.path;
  const dirHash = currentPath[currentPath.length-1].hash;
  // Add the item and update path
  const newHash = yield call(addItemToDirectory, dirHash, newItem);
  const path = yield call(buildNewPath, currentPath, newHash);
  yield put(setPath(path));
  // Analyze new item
  yield put({ type: types.ANALYZE_LINK, hash: newHash });
}

export function* watchRemove(action){
  const { name } = action;
  const state = yield select();
  const currentPath = state.ipfs.path;
  const dirHash = currentPath[currentPath.length-1].hash;
  const files = state.ipfs.files;
  const newHash = yield call(removeLink, dirHash, files, name);
  // Update path
  const path = yield call(buildNewPath, currentPath, newHash);
  yield put(setPath(path));
}

export function* watchRename(action){
  const { name, newName } = action;
  const state = yield select();
  const currentPath = state.ipfs.path;
  const dirHash = currentPath[currentPath.length-1].hash;
  const files = state.ipfs.files;
  const newHash = yield call(renameLink, dirHash, files, name, newName);
  // Analyze new item
  yield put({ type: types.ANALYZE_LINK, hash: newHash });
  // Update path
  const path = yield call(buildNewPath, currentPath, newHash);
  yield put(setPath(path));
}
