const removeTrailingSlash = s => {
  if(typeof s === 'string' && s.length > 0 && s[s.length-1] === '/') return s.slice(0, s.length-1);
  return s;
};

export function areStringPathsDifferent(path, otherPath) {
  return removeTrailingSlash(path) !== removeTrailingSlash(otherPath);
}

export function arrayPathToString(path) {
  const basePath = path[0].ipns ? '/ipns/' : '/ipfs/';
  const pathString = basePath + [path[0].hash].concat(path.slice(1).map(p => p.name)).join('/');
  return pathString;
}

export function pathToArrayOfObjects(path) {
  if (path.length < 1) return [];
  let p = path;
  if (typeof path === 'string'){
    p = p.split('/').filter(s => !!s);
  }
  let first = p[0];
  if (first === '' || first === 'ipfs' || first === 'ipns') p = p.slice(1);
  return p.map((obj, i) => {
    if (obj === '' || (i === 0 && (obj === 'ipfs' || obj === 'ipns'))) {
      return null;
    } else if (typeof obj === 'string') {
      if (i === 0) return { hash: obj };
      return { name: obj };
    } else {
      return obj;
    }
  }).filter(o => o !== null);
}
