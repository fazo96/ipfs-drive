
import * as types from '../constants/actionTypes';
import { takeLatest } from 'redux-saga/effects';
import {
  watchFetchContent,
  watchLocationChange
} from './read';
import {
  watchAdd,
  watchRemove,
  watchRename
} from './write';

export default function* saga() {
  // Router
  yield takeLatest('@@router/LOCATION_CHANGE', watchLocationChange);
  // Reading
  yield takeLatest(types.FETCH_CONTENT, watchFetchContent);
  // Writing
  yield takeLatest(types.ADD, watchAdd);
  yield takeLatest(types.REMOVE, watchRemove);
  yield takeLatest(types.RENAME, watchRename);
}
