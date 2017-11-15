import * as types from '../constants/actionTypes';
import { push } from 'react-router-redux';
import {
  pathToString,
  preparePath,
  readDir
} from '../utils/ipfs';

export function setPath(path) {
  return function(dispatch) {
    dispatch({type: types.SET_PATH, path });
    dispatch(push(pathToString(path)));
  };
}

export function goTo(path) {
  return async function(dispatch) {
    path = preparePath(path);
    dispatch(setPath(path));
    const newPath = [Object.assign({}, path[0])];
    let files = await readDir(newPath[0].hash);
    for (const subpath of path.slice(1)) {
      if (subpath.hash) {
        newPath.push(Object.assign({}, subpath));
      } else {
        const matches = files.filter(f => f.name === subpath.name);
        const hash = matches[0].hash;
        newPath.push(Object.assign({}, subpath, { hash }));
        files = await readDir(hash);
      }
    }
    dispatch(setPath(newPath));
    dispatch({type: types.CHANGE_FILES, files});
  };
}
