import dagPB from 'ipld-dag-pb';
import multihashes from 'multihashes';
import CID from 'cids';

export const folderData = Buffer.from(new Uint8Array([8, 1]));

export function createDAGLink(name, length, hash) {
  return new Promise((resolve, reject)=> {
    // hash can be buffer or string
    dagPB.DAGLink.create(name, length, hash, (err, x) => err ? reject(err) : resolve(x));
  });
}

export async function create() {
  const IPFS = (await import('ipfs')).default;
  const node = new IPFS();
  return new Promise(resolve => node.on('ready', () => resolve(node)));
}

export async function getIPFS() {
  let ipfs = window.ipfs_enabled || window.ipfs;
  if (!ipfs) {
    ipfs = await create();
  } else if (typeof ipfs.enable === 'function') {
    // support window.ipfs from IPFS companion
    // https://github.com/ipfs-shipyard/ipfs-companion/blob/master/docs/window.ipfs.md
    try {
      ipfs = await window.ipfs.enable({
        commands: ['object', 'add'],
      });
    } catch (error) {
      ipfs = await create();
    }
  }
  window.ipfs_enabled = ipfs;
  return ipfs;
}

export async function createDAGNode(hash) {
  const ipfs = await getIPFS();
  return ipfs.object.get(hash);
}

export async function readLinks(hash) {
  const ipfs = await getIPFS();
  const links = await ipfs.object.links(hash);
  return links.map(link => ({
    name: link.name,
    hash: link.cid.toBaseEncodedString(),
    size: link.size,
  }));
}

export async function analyze(link) {
  const ipfs = await getIPFS();
  const stats = await ipfs.object.stat(link.hash);
  return {
    hash: link.hash,
    size: stats.CumulativeSize,
    folder: stats.NumLinks > 0 || stats.DataSize === 2
  };
}

export function fileWithName(files, name) {
  const matches = files.filter(f => f.name === name);
  if (matches.length === 1) return matches[0];
  return null;
}

export async function addItemToDirectory(directoryHash, item) {
  const newFileDagNode = await createDAGNode(item.hash);
  const cid = new CID(item.hash);
  const dagLink = await createDAGLink(item.name, newFileDagNode.size, cid);
  const ipfs = await getIPFS();
  const newCID = await ipfs.object.patch.addLink(directoryHash, dagLink);
  return newCID.toBaseEncodedString();
}

export async function createItem(name, content) {
  const item = {
    path: name,
    content,
  };
  const ipfs = await getIPFS();
  const result = await ipfs.add([item]);
  if (result.length === 1) {
    return {
      name: result[0].path,
      hash: result[0].hash,
      folder: content === undefined,
    };
  } else {
    throw new Error('Could not create item');
  }
}

export function iterateAsyncTimes(iterate, times) {
  let promise = null;
  for (let i = 0; i < times; i++) {
    if (promise) {
      promise = promise.then(iterate);
    } else {
      promise = iterate();
    }
  }
  return promise;
}

export async function buildNewPath(currentPath, newCurrentFolderHash) {
  // build new path starting from current folder (that has just changed) going up to root
  const reversedPath = [...currentPath].reverse();
  const iterate = async (newPathReversed = []) => {
    const i = newPathReversed.length;
    const folder = reversedPath[i];
    let newCID = new CID(newCurrentFolderHash);
    if (i !== 0) {
      const ipfs = await getIPFS();
      // Not current dir, this directory is higher in the tree. Need to replace child link
      const child = newPathReversed[i - 1];
      const childHash = multihashes.fromB58String(child.hash);
      // find old link
      const currentContents = await readLinks(folder.hash);
      const oldChild = fileWithName(currentContents, child.name);
      const oldDagLink = await createDAGLink(
        child.name,
        oldChild.size,
        multihashes.fromB58String(oldChild.hash),
      );
      // remove old link
      const cid = folder.hash;
      newCID = await ipfs.object.patch.rmLink(cid, oldDagLink);
      // prepare new child link
      const dagLink = await createDAGLink(child.name, child.size, childHash);
      // add new child link
      newCID = await ipfs.object.patch.addLink(newCID.toBaseEncodedString(), dagLink);
    }
    const newCIDString = newCID.toBaseEncodedString();
    const newDAGNode = createDAGNode(newCIDString);
    return newPathReversed.concat(Object.assign({}, folder, {
      hash: newCIDString,
      size: newDAGNode.size,
    }));
  };
  const newPathReversed = await iterateAsyncTimes(iterate, reversedPath.length)
  return newPathReversed.reverse();
}

export async function resolveNewPathCIDs(path) {
  const { hash } = path[0];
  const analysis = await analyze({ hash });
  const resolvedPath = [Object.assign({}, path[0], analysis)];
  const iterate = async (newPath = resolvedPath) => {
    const i = newPath.length;
    const subpath = path[i];
    const files = await readLinks(newPath[i - 1].hash);
    let updatedNewPath = [...newPath];
    if (subpath.hash) {
      updatedNewPath = updatedNewPath.concat(Object.assign({}, subpath));
    } else {
      const matches = files.filter(f => f.name === subpath.name);
      if (matches.length > 0) {
        updatedNewPath[newPath.length - 1].folder = true;
        const { hash: subPathHash } = matches[0];
        const subPathAnalysis = await analyze({ hash: subPathHash });
        updatedNewPath = updatedNewPath.concat({
          ...subpath,
          hash: subPathHash,
          ...subPathAnalysis,
        });
      } else {
        throw new Error('Could not resolve path');
      }
    }
    return updatedNewPath;
  };
  const result = await iterateAsyncTimes(iterate, path.length - 1);
  return result || resolvedPath;
}

export async function removeLink(hash, files, name) {
  const link = fileWithName(files, name);
  const dagLink = await createDAGLink(name, link.size, link.hash);
  const ipfs = await getIPFS();
  const newCID = await ipfs.object.patch.rmLink(hash, dagLink);
  return newCID.toBaseEncodedString()
}

export async function renameLink(hash, files, name, newName) {
  // Remove link
  const link = fileWithName(files, name);
  const oldDagLink = await createDAGLink(name, link.size, link.hash);
  const ipfs = await getIPFS();
  let newCID = await ipfs.object.patch.rmLink(hash, oldDagLink);
  // Add new link (like old one but renamed)
  const newDagLink = await createDAGLink(newName, link.size, link.hash);
  newCID = await ipfs.object.patch.addLink(newCID.toBaseEncodedString(), newDagLink);
  return newCID.toBaseEncodedString();
}
