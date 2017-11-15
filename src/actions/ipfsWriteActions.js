import * as types from '../constants/actionTypes';
import multihashes from 'multihashes';
import {
  getNode,
  createDAGLink,
  readDir
} from '../utils/ipfs';
import { setPath } from './ipfsNavigateActions';

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
        const currentContents = await readDir(folder.hash);
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
    const files = await readDir(newPath[newPath.length-1].hash);
    dispatch({type: types.CHANGE_FILES, files});
  };
}
