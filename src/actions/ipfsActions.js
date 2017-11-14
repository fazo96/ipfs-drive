import * as types from '../constants/actionTypes';
import IPFS from 'ipfs';
import multihashes from 'multihashes';
import dagPB from 'ipld-dag-pb';
import { push } from 'react-router-redux';

export function changeFiles(files) {
  return {
    type: types.CHANGE_FILES,
    files
  };
}

export function setPath(path) {
  return function(dispatch) {
    dispatch({type: types.SET_PATH, path });
    dispatch(push(pathToString(path)));
  }
}

export function pathToString(path) {
  return '/ipfs/' + [path[0].hash].concat(path.slice(1).map(p => p.name)).join('/');
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

async function getNode() {
  return window.ipfs ? window.ipfs : window.ipfs = await create();
}

export function goTo(path) {
  return async function(dispatch) {
    // TODO dispatch loading action
    dispatch({type: types.CHANGE_FILES, files: []});
    const node = await getNode();
    const p = preparePath(path);
    let hash = p[0].hash;
    let fullPath = [{ hash }];
    let files = await readDir(node, hash);
    for (const subpath of p.slice(1)) {
      if (subpath.hash) {
        fullPath.push(subpath);
      } else {
        const matches = files.filter(f => f.name === subpath.name);
        if (matches.length > 0) {
          hash = matches[0].hash;
          files = await readDir(node, hash);
        } else {
          dispatch({type: 'ERROR'});
          return;
        }
      }
    }
    dispatch(setPath(fullPath));
    dispatch({type: types.CHANGE_FILES, files});
  };
}

function createDAGLink(name, length, hash) {
  return new Promise(fullfill => {
    dagPB.DAGLink.create(name, length, hash, (err, x) => fullfill(x));
  });
}

export function addTextFile(filename, content) {
  return async function(dispatch, getState) {
    dispatch({type: 'ADDING_FILE'});
    const node = await getNode();
    // Add file to IPFS
    const buffer = new Buffer(content);
    const newFileDagNode = await node.object.put({
      Links: [],
      Data: buffer
    });
    const dagLink = await createDAGLink(filename, buffer.length, newFileDagNode.multihash);
    // build new path starting from current folder going up to root
    const reversedPath = getState().ipfs.path.reverse();
    const newPathReversed = [];
    for (const folder of reversedPath) {
      const hash = multihashes.fromB58String(folder.hash);
      let newDAGNode = await node.object.patch.addLink(hash, dagLink);
      newPathReversed.push(Object.assign({}, folder, {
        hash: multihashes.toB58String(newDAGNode.multihash)
      }))
    }
    dispatch(goTo(newPathReversed.reverse()));
  };
}

function preparePath(path) {
  let p = path;
  if (typeof path === 'string'){
    p = p.split('/');
  }
  return p.map((obj, i) => {
    if (typeof obj === 'string') {
      if (i === 0) return { hash: obj };
      return { name: obj };
    } else {
      return obj;
    }
  });
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
