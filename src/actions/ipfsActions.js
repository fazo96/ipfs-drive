import * as types from '../constants/actionTypes';
import IPFS from 'ipfs';
import multihashes from 'multihashes';

export function changeFiles(files) {
  return {
    type: types.CHANGE_FILES,
    files
  };
}

export function init() {
  return async function(dispatch) {
    const node = await create();
    dispatch({type: 'IPFS_CREATED'});
    const hash = await emptyObject(node);
    dispatch({type: types.SET_PATH, path: { hash }});
    const files = await readDir(node, hash);
    dispatch({type: types.CHANGE_FILES, files});
  };
}

export function goTo(path) {
  return async function(dispatch) {
    const node = window.ipfs ? window.ipfs : window.ipfs = await create();
    const p = preparePath(path);
    let hash = p[0];
    let fullPath = [{ hash }];
    let files = await readDir(node, hash);
    for (const subpath of p.slice(1)) {
      const matches = files.filter(f => f.name === subpath);
      if (matches.length > 0) {
        hash = matches[0].hash;
        fullPath.push({ name: matches[0].name, hash });
        files = await readDir(node, hash);
      } else {
        dispatch({type: 'ERROR'});
        return;
      }
    }
    dispatch({type: types.SET_PATH, path: fullPath });
    dispatch({type: types.CHANGE_FILES, files});
  };
}

function preparePath(path) {
  let p = path;
  if (!Array.isArray(p)) {
    p = p.split('/');
  }
  return p;
}

async function create () {
  console.log('creating');
  return await new Promise(fullfill => {
    const node = new IPFS({
      store: String(Math.random() + Date.now())
    });

    node.on('ready', () => fullfill(node));
  });
}

async function readDir (node, hash) {
  console.log('readDir', hash);
  const links = await node.object.links(hash);
  return links.map(link => {
    return {
      name: link.name,
      hash: multihashes.toB58String(link.multihash),
      size: link.size,
      type: '?'
    };
  });
}

async function emptyObject(node) {
  const obj = await node.object.new('unixfs-dir');
  return obj.toJSON().multihash;
}
