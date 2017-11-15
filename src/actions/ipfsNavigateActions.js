import * as types from '../constants/actionTypes';
import { push } from 'react-router-redux';
import {
  readLinks,
  readDir,
  analyze,
  fileWithName
} from '../utils/ipfs';
import { arrayPathToString, pathToArrayOfObjects } from '../utils/path';

export function setPath(path) {
  return function(dispatch) {
    dispatch({type: types.SET_PATH, path });
    dispatch(push(arrayPathToString(path)));
  };
}

export function goTo(path) {
  return async function(dispatch) {
    path = pathToArrayOfObjects(path);
    dispatch(setPath(path));
    const newPath = [Object.assign({}, path[0])];
    let files = await readLinks(newPath[0].hash);
    for (const subpath of path.slice(1)) {
      if (subpath.hash) {
        newPath.push(Object.assign({}, subpath));
      } else {
        const matches = files.filter(f => f.name === subpath.name);
        if(matches.length > 0) {
          newPath[newPath.length-1].folder = true;
          const hash = matches[0].hash;
          newPath.push(Object.assign({}, subpath, { hash }));
          files = await readLinks(hash);
        } else {
          // TODO errors
          return dispatch({type: 'ERROR'});
        }
      }
    }
    dispatch(setPath(newPath));
    files = await readDir(newPath[newPath.length-1].hash);
    dispatch({type: types.CHANGE_FILES, files});
  };
}

export function goToRelative(path) {
  return async function(dispatch, getState) {
    let newPath = [ ...getState().ipfs.path ];
    const files = getState().ipfs.files;
    if (path === '..') {
      newPath = newPath.slice(0, newPath.length-1);
    } else {
      const child = fileWithName(files, path);
      if (child) {
        newPath.push(child);
      } else {
        // TODO errors
        dispatch({type:'ERROR'});
      }
    }
    if (newPath[newPath.length-1].folder) {
      dispatch(goTo(newPath));
    } else {
      dispatch({type: 'DOWNLOAD'});
    }
  };
}
