import * as types from '../constants/actionTypes';
import {
  readLinks,
  analyze
} from '../utils/ipfs';
import { call, put, fork } from 'redux-saga/effects';
import { pathToArrayOfObjects } from '../utils/path';

export function* watchFetchContent(action) {
  const { hash } = action.path[action.path.length-1];
  let links = yield call(readLinks, hash);
  yield put({ type: types.SET_CONTENT, files: links });
  yield fork(analyzeLinks, links);
}

function* analyzeLinks(links) {
  for (const link of links) {
    yield put({ type: types.ANALYZE_LINK, item: link });
    const analysis = yield call(analyze, link);
    yield put({ type: types.LINK_ANALYSIS, item: analysis });
  }
}

export function* watchLocationChange(action) {
  const { pathname } = action.payload;
  if (pathname.indexOf('/ipfs/') === 0) {
    yield call(watchSetPath, { path: pathname });
  }
}

function* watchSetPath(action) {
  const actionPath = action.path;
  // TODO: Save latest path
  const path = pathToArrayOfObjects(actionPath);
  if (path.length > 0) {
    yield call(saveRootHash, path[0].hash);
    // Resolve relative
    const hash = path[0].hash;
    const analysis = yield call(analyze, { hash });
    const newPath = [Object.assign({}, path[0], analysis)];
    let files = yield call(readLinks, newPath[0].hash);
    const subpaths = path.slice(1);
    for (const subpath of subpaths) {
      if (subpath.hash) {
        newPath.push(Object.assign({}, subpath));
      } else {
        const matches = files.filter(f => f.name === subpath.name);
        if(matches.length > 0) {
          newPath[newPath.length-1].folder = true;
          const hash = matches[0].hash;
          const analysis = yield call(analyze, { hash });
          newPath.push(Object.assign({}, subpath, { hash }, analysis));
          files = yield call(readLinks, hash);
        } else {
          // TODO errors
          return yield put({type: 'ERROR'});
        }
      }
    }
    // Fetch content
    yield put({ type: types.UPDATE_PATH_INFO, path: newPath });
    yield put({ type: types.FETCH_CONTENT, path: newPath });
  }
}

function saveRootHash(hash) {
  window.localStorage.setItem('ipfsDriveRootHash', hash);
}
