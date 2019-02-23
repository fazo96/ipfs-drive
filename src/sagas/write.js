import { call, put, select } from 'redux-saga/effects';
import {
  buildNewPath,
  createItem,
  addItemToDirectory,
  removeLink,
  renameLink,
} from '../utils/ipfs';
import { setPath } from '../actions/pathActions';
import { notifyError } from '../actions/error';
import { analyzeLink } from '../actions/filesActions';

function* addLinkSaga(item) {
  let newItem;
  const state = yield select();
  // Prepare item
  if (item.hash) {
    newItem = item;
  } else if (item.content) {
    const buffer = Buffer.from(item.content);
    newItem = yield call(createItem, item.name, buffer);
  } else {
    newItem = yield call(createItem, item.name);
  }
  if (state.files.filter(f => f.name === item.name).length > 0) {
    yield put(notifyError('There is already an item with that name'));
  } else {
    // Prepare path info
    const currentPath = state.path;
    const dirHash = currentPath[currentPath.length - 1].hash;
    // Add the item and update path
    const newHash = yield call(addItemToDirectory, dirHash, newItem);
    const path = yield call(buildNewPath, currentPath, newHash);
    yield put(setPath(path));
    // Analyze new item
    yield put(analyzeLink({ hash: newHash }));
  }
}

export function* watchAdd(action) {
  yield addLinkSaga(action.item);
}

export function* watchPaste() {
  const state = yield select();
  yield addLinkSaga(state.clipboard);
}

export function* watchRename(action) {
  const { name, newName } = action;
  const state = yield select();
  const currentPath = state.path;
  const dirHash = currentPath[currentPath.length - 1].hash;
  const { files } = state;
  const newHash = yield call(renameLink, dirHash, files, name, newName);
  // Analyze new item
  yield put(analyzeLink({ hash: newHash }));
  // Update path
  const path = yield call(buildNewPath, currentPath, newHash);
  yield put(setPath(path));
}

export function* watchRemove(action) {
  yield removeLinkSaga(action.name);
}

export function* watchCut(action) {
  yield removeLinkSaga(action.item.name);
}

function* removeLinkSaga(name) {
  const state = yield select();
  const currentPath = state.path;
  const dirHash = currentPath[currentPath.length - 1].hash;
  const { files } = state;
  const newHash = yield call(removeLink, dirHash, files, name);
  // Update path
  const path = yield call(buildNewPath, currentPath, newHash);
  yield put(setPath(path));
}
