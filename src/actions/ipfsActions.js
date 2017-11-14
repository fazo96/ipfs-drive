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
  };
}

export function pathToString(path) {
  console.log(path);
  const pathString = '/ipfs/' + [path[0].hash].concat(path.slice(1).map(p => p.name)).join('/');
  console.log(pathString);
  return pathString;
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
    path = preparePath(path);
    dispatch(setPath(path));
    const node = await getNode();
    let hash = path[0].hash;
    let files = await readDir(node, hash);
    const newPath = [Object.assign({}, path[0])];
    for (const subpath of path.slice(1)) {
      if (subpath.hash) {
        newPath.push(Object.assign({}, subpath));
      } else {
        const matches = files.filter(f => f.name === subpath.name);
        if (matches.length > 0) {
          hash = matches[0].hash;
          newPath.push(Object.assign({}, { hash }));
          files = await readDir(node, hash);
        } else {
          dispatch({type: 'ERROR'});
          return;
        }
      }
    }
    dispatch(setPath(path));
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
    const newFileDagNode = await node.object.put({
      Links: [],
      Data: content
    });
    const dagLink = await createDAGLink(filename, newFileDagNode.size, newFileDagNode.multihash);
    // build new path starting from current folder going up to root
    const reversedPath = getState().ipfs.path.reverse();
    const newPathReversed = [];
    for (const folder of reversedPath) {
      const hash = multihashes.fromB58String(folder.hash);
      let newDAGNode = await node.object.patch.addLink(hash, dagLink);
      newPathReversed.push(Object.assign({}, folder, {
        hash: multihashes.toB58String(newDAGNode.multihash)
      }));
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
  return await new Promise(fullfill => {
    const node = new IPFS({
      store: String(Math.random() + Date.now())
    });

    node.on('ready', () => fullfill(node));
  });
}

async function readDir (node, hash) {
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
