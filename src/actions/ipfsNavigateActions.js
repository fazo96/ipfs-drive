import { pathToString } from '../utils/path';
import { push } from 'react-router-redux';

export function setPath(path) {
  // Change absolute path
  return push(pathToString(path));
}

export const emptyHash = 'QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn';

export function loadRootHash() {
  return window.localStorage.getItem('ipfsDriveRootHash') || emptyHash;
}
