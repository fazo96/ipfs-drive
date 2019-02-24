import {
  FETCH_CONTENT,
  SET_CONTENT,
  ANALYZE_LINK,
  LINK_ANALYSIS,
} from '../constants/actionTypes';

export function analyzeLink(item) {
  return {
    type: ANALYZE_LINK,
    item,
  };
}

export function linkAnalysis(analysis) {
  return {
    type: LINK_ANALYSIS,
    item: analysis,
  };
}

export function fetchContent(path) {
  return {
    type: FETCH_CONTENT,
    path,
  };
}

export function setContent(files) {
  return {
    type: SET_CONTENT,
    files,
  };
}
