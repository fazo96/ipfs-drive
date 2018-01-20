
import * as types from '../constants/actionTypes';
import { takeLatest, takeEvery } from 'redux-saga/effects';
import {
  watchFetchContent,
  watchLocationChange,
  watchAnalyzeLink
} from './read';
import {
  watchAdd,
  watchRemove,
  watchRename,
  watchCut,
  watchPaste
} from './write';

export default function* saga() {
  // Router
  yield takeLatest('@@router/LOCATION_CHANGE', watchLocationChange);
  // Reading
  yield takeLatest(types.FETCH_CONTENT, watchFetchContent);
  yield takeEvery(types.ANALYZE_LINK, watchAnalyzeLink);
  // Writing
  yield takeLatest(types.ADD, watchAdd);
  yield takeLatest(types.REMOVE, watchRemove);
  yield takeLatest(types.RENAME, watchRename);
  yield takeLatest(types.CUT, watchCut);
  yield takeLatest(types.PASTE, watchPaste);
}
