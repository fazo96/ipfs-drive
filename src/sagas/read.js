import { call, put, spawn } from 'redux-saga/effects';
import {
  readLinks,
  analyze,
  resolveNewPathCIDs,
} from '../utils/ipfs';
import { pathToArrayOfObjects } from '../utils/path';
import {
  setContent, analyzeLink, linkAnalysis, fetchContent,
} from '../actions/filesActions';
import { updatePathInfo } from '../actions/pathActions';
import { notifyError } from '../actions/error';

function* analyzeLinks(links) {
  yield links.map(link => put(analyzeLink(link)));
}

export function* watchFetchContent(action) {
  const { hash } = action.path[action.path.length - 1];
  const links = yield call(readLinks, hash);
  yield put(setContent(links));
  yield spawn(analyzeLinks, links);
}

export function* watchAnalyzeLink(action) {
  const analysis = yield call(analyze, action.item);
  yield put(linkAnalysis(analysis));
}

function* watchSetPath(action) {
  const actionPath = action.path;
  // TODO: Save latest path
  const path = pathToArrayOfObjects(actionPath);
  if (path.length > 0) {
    // Resolve relative
    try {
      const newPath = yield call(resolveNewPathCIDs, path);
      // Fetch content
      yield put(updatePathInfo(newPath));
      yield put(fetchContent(newPath));
    } catch (error) {
      yield put(notifyError('Path is invalid'));
    }
  }
}

export function* watchLocationChange(action) {
  const { pathname } = action.payload;
  if (pathname.indexOf('/ipfs/') === 0) {
    yield call(watchSetPath, { path: pathname });
  }
}