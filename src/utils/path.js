const removeTrailingSlash = s => {
  if(typeof s === 'string' && s.length > 0 && s[s.length-1] === '/') return s.slice(0, s.length-1);
  return s;
};

export function areStringPathsDifferent(path, otherPath) {
  return removeTrailingSlash(path) !== removeTrailingSlash(otherPath);
}

export function pathToString(path) {
  if (typeof path === 'string') return path;
  const basePath = path[0].ipns ? '/ipns/' : '/ipfs/';
  const firstItem = path[0].ipns ? path[0].ipns : path[0].hash;
  const pathString = basePath + [firstItem].concat(path.slice(1).map(p => p.name)).join('/');
  return pathString;
}

export function pathToArrayOfObjects(path) {
  if (path.length < 1) return [];
  let p = path;
  if (typeof path === 'string'){
    p = p.split('/').filter(s => !!s);
  }
  let ipns = false;
  let firstParsed = false;
  return p.map((obj, i) => {
    if (obj === 'ipns') {
      ipns = true;
      return null;
    } else if (obj === '' || (i === 0 && obj === 'ipfs')) {
      return null;
    } else if (typeof obj === 'string') {
      if (!firstParsed) {
        firstParsed = true;
        return ipns ? { ipns: obj } : { hash: obj };
      } else {
        return { name: obj };
      }
    } else {
      return obj;
    }
  }).filter(o => o !== null);
}

export function getFilePath(item, path) {
  if (item === '..' || item.name === '..') {
    return pathToArrayOfObjects(path).slice(0, path.length-1);
  } else if (item === '.' || item.name !== '.') {
    return pathToArrayOfObjects(path).concat(item);
  }
  return path;
}
