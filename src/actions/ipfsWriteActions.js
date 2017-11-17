import * as types from '../constants/actionTypes';
import multihashes from 'multihashes';
import {
  getIPFS,
  createDAGLink,
  readDir,
  createItem,
  buildNewPath,
  fileWithName
} from '../utils/ipfs';
import { setPath } from './ipfsNavigateActions';

export function add(obj) {
  return async function(dispatch){
    if (obj.hash) dispatch(addLinkFromHash(obj.name, obj.hash));
    else if (obj.content) dispatch(addTextFile(obj.name, obj.content));
    else dispatch(addEmptyFolder(obj.name));
  };
}

export function addEmptyFolder(name) {
  return async function(dispatch) {
    const newItem = await createItem(name);
    dispatch(addLinkFromHash(name, newItem.hash));
  };
}

export function addTextFile(filename, content) {
  return async function(dispatch) {
    const newItem = await createItem(name, Buffer.from(content));
    dispatch(addLinkFromHash(filename, newItem.hash));
  };
}

export function addLinkFromHash(filename, hash) {
  return async function(dispatch) {
    const ipfs = await getIPFS();
    const newFileDagNode = await ipfs.object.get(hash);
    dispatch(addLinkFromDAGNode(filename, newFileDagNode));
  };
}

function addingNode(dagNode) {
  return {
    type: types.ADDING_NODE,
    node: {
      name: dagNode.name,
      hash: multihashes.toB58String(dagNode.multihash)
    }
  };
}

export function addLinkFromDAGNode(filename, newFileDagNode) {
  return async function(dispatch, getState) {
    dispatch(addingNode(newFileDagNode));
    // Add the new link to current dir
    const dagLink = await createDAGLink(filename, newFileDagNode.size, newFileDagNode.multihash);
    const ipfs = await getIPFS();
    const path = getState().ipfs.path;
    const newDAGNode = await ipfs.object.patch.addLink(path[path.length-1].hash, dagLink);
    // Build new path
    const newPath = await buildNewPath(path, newDAGNode);
    dispatch(setPath(newPath));
    // Refresh files
    const files = await readDir(newPath[newPath.length-1].hash);
    dispatch({type: types.CHANGE_FILES, files});
  };
}

export function removeLink(name) {
  return async function(dispatch, getState) {
    const ipfs = await getIPFS();
    const path = getState().ipfs.path;
    // Remove link from current dir
    const hash = path[path.length-1].hash;
    const link = fileWithName(getState().ipfs.files, name);
    const dagLink = await createDAGLink(name, link.size, link.hash);
    const newDAGNode = await ipfs.object.patch.rmLink(hash, dagLink);
    // Build new path
    const newPath = await buildNewPath(path, newDAGNode);
    dispatch(setPath(newPath));
    // Refresh files
    const files = await readDir(newPath[newPath.length-1].hash);
    dispatch({type: types.CHANGE_FILES, files});
  };
}

export function renameLink(name, newName) {
  return async function(dispatch, getState) {
    const ipfs = await getIPFS();
    const path = getState().ipfs.path;
    // Remove link from current dir
    let hash = path[path.length-1].hash;
    const link = fileWithName(getState().ipfs.files, name);
    const oldDagLink = await createDAGLink(name, link.size, link.hash);
    let newDAGNode = await ipfs.object.patch.rmLink(hash, oldDagLink);
    hash = multihashes.toB58String(newDAGNode.multihash);
    // Add new link (like old one but renamed)
    const newDagLink = await createDAGLink(newName, link.size, hash);
    newDAGNode = await ipfs.object.patch.addLink(hash, newDagLink);
    // Build new path
    const newPath = await buildNewPath(path, newDAGNode);
    dispatch(setPath(newPath));
    // Refresh files
    const files = await readDir(newPath[newPath.length-1].hash);
    dispatch({type: types.CHANGE_FILES, files});
  };
}
