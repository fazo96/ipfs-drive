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
  const pathString = '/ipfs/' + [path[0].hash].concat(path.slice(1).map(p => p.name)).join('/');
  return pathString;
}

async function getNode() {
  return window.ipfs ? window.ipfs : window.ipfs = await create();
}

export function goTo(path) {
  return async function(dispatch) {
    path = preparePath(path);
    dispatch(setPath(path));
    const node = await getNode();
    const newPath = [Object.assign({}, path[0])];
    let files = await readDir(node, newPath[0].hash);
    for (const subpath of path.slice(1)) {
      if (subpath.hash) {
        newPath.push(Object.assign({}, subpath));
      } else {
        const matches = files.filter(f => f.name === subpath.name);
        const hash = matches[0].hash;
        newPath.push(Object.assign({}, subpath, { hash }));
        files = await readDir(node, hash);
      }
    }
    dispatch(setPath(newPath));
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
    // build new path starting from current folder going up to root
    const reversedPath = [ ...getState().ipfs.path ].reverse();
    const newPathReversed = [];
    for (const index in reversedPath) {
      const i = parseInt(index);
      const folder = reversedPath[i];
      const hash = multihashes.fromB58String(folder.hash);
      let newDAGNode = null;
      if (i === 0) {
        // Current dir. Add the new link
        const dagLink = await createDAGLink(filename, newFileDagNode.size, newFileDagNode.multihash);
        newDAGNode = await node.object.patch.addLink(hash, dagLink);
      } else {
        // Not current dir, this directory is higher in the tree. Need to replace child link
        const child = newPathReversed[i-1];
        const childHash = multihashes.fromB58String(child.hash);
        // find old link
        const currentContents = await readDir(node, folder.hash);
        const oldChild = currentContents.filter(f => f.name === child.name)[0];
        const oldDagLink = await createDAGLink(child.name, oldChild.size, multihashes.fromB58String(oldChild.hash));
        // remove old link
        newDAGNode = await node.object.patch.rmLink(hash, oldDagLink);
        // prepare new child link
        const dagLink = await createDAGLink(child.name, oldChild.size + newFileDagNode.size, childHash); // TODO check size
        // add new child link
        newDAGNode = await node.object.patch.addLink(newDAGNode.multihash, dagLink);
      }
      newPathReversed.push(Object.assign({}, folder, {
        hash: multihashes.toB58String(newDAGNode.multihash)
      }));
    }
    const newPath = newPathReversed.reverse();
    dispatch(setPath(newPath));
    const files = await readDir(node, newPath[newPath.length-1].hash);
    dispatch({type: types.CHANGE_FILES, files});
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
