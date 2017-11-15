import * as types from '../constants/actionTypes';
import multihashes from 'multihashes';
import {
  getIPFS,
  createDAGLink,
  readLinks,
  readDir,
  folderData
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
    const ipfs = await getIPFS();
    // Add file to IPFS
    const newFileDagNode = await ipfs.object.put({
      Links: [],
      Data: Buffer.from(folderData)
    });
    dispatch(addLinkFromDAGNode(name, newFileDagNode));
  };
}

export function addTextFile(filename, content) {
  return async function(dispatch) {
    const ipfs = await getIPFS();
    // Add file to IPFS
    const newFileDagNode = await ipfs.object.put({
      Links: [],
      Data: content
    });
    dispatch(addLinkFromDAGNode(filename, newFileDagNode));
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
    // build new path starting from current folder going up to root
    const reversedPath = [ ...getState().ipfs.path ].reverse();
    const newPathReversed = [];
    for (const index in reversedPath) {
      const i = parseInt(index);
      const folder = reversedPath[i];
      const hash = multihashes.fromB58String(folder.hash);
      let newDAGNode = null;
      const ipfs = await getIPFS();
      if (i === 0) {
        // Current dir. Add the new link
        const dagLink = await createDAGLink(filename, newFileDagNode.size, newFileDagNode.multihash);
        newDAGNode = await ipfs.object.patch.addLink(hash, dagLink);
      } else {
        // Not current dir, this directory is higher in the tree. Need to replace child link
        const child = newPathReversed[i-1];
        const childHash = multihashes.fromB58String(child.hash);
        // find old link
        const currentContents = await readLinks(folder.hash);
        const oldChild = currentContents.filter(f => f.name === child.name)[0];
        const oldDagLink = await createDAGLink(child.name, oldChild.size, multihashes.fromB58String(oldChild.hash));
        // remove old link
        newDAGNode = await ipfs.object.patch.rmLink(hash, oldDagLink);
        // prepare new child link
        const dagLink = await createDAGLink(child.name, oldChild.size + newFileDagNode.size, childHash); // TODO check size
        // add new child link
        newDAGNode = await ipfs.object.patch.addLink(newDAGNode.multihash, dagLink);
      }
      newPathReversed.push(Object.assign({}, folder, {
        hash: multihashes.toB58String(newDAGNode.multihash)
      }));
    }
    const newPath = newPathReversed.reverse();
    dispatch(setPath(newPath));
    const files = await readDir(newPath[newPath.length-1].hash);
    dispatch({type: types.CHANGE_FILES, files});
  };
}
