import { pathToString } from '../utils/path';
import { push } from 'react-router-redux';
import { UPDATE_PATH_INFO } from '../constants/actionTypes';

export function setPath(path) {
  // Change absolute path
  return push(pathToString(path));
}

export function updatePathInfo(path) {
  return {
    type: UPDATE_PATH_INFO,
    path
  };
}

export const emptyHash = 'QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn';

export function loadRootHash() {
  return window.localStorage.getItem('ipfsDriveRootHash') || emptyHash;
}
