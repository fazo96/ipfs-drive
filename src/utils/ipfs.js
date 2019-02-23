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

export async function getIPFS() {
  let ipfs = window.ipfs_enabled || window.ipfs;
  if (!ipfs) {
    ipfs = window.ipfs_enabled = await create();
  } else if (typeof ipfs.enable === 'function') {
    // support window.ipfs from IPFS companion
    // https://github.com/ipfs-shipyard/ipfs-companion/blob/master/docs/window.ipfs.md
    try {
      ipfs = window.ipfs_enabled = await window.ipfs.enable({
        commands: ['object', 'add']
      })
    } catch (error) {
      ipfs = window.ipfs_enabled = await create();
    }
  }
  return ipfs
}

export async function create () {
  const IPFS = (await import('ipfs')).default
  const node = new IPFS({
    store: window.location.pathname,
    config: {
      Addresses: {
        Swarm: [
          '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
          '/dns4/ws-star-signal-1.servep2p.com/tcp/443/wss/p2p-websocket-star',
          '/dns4/ws-star-signal-2.servep2p.com/tcp/443/wss/p2p-websocket-star'
        ]
      }
    }
  });
  return await new Promise(async fullfill => {
    node.on('ready', () => fullfill(node));
  });
}

export async function readLinks (hash) {
  const ipfs = await getIPFS();
  const links = await ipfs.object.links(hash);
  return links.map(link => {
    return {
      name: link.name,
      hash: link.cid.toBaseEncodedString(),
      size: link.size
    };
  });
}

export async function analyze (link) {
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
  const cid = new CID(item.hash)
  const dagLink = await createDAGLink(item.name, newFileDagNode.size, cid);
  const ipfs = await getIPFS();
  const newCID = await ipfs.object.patch.addLink(directoryHash, dagLink);
  return newCID.toBaseEncodedString()
}

export async function createItem(name, content) {
  const item = {
    path: name,
    content
  };
  const ipfs = await getIPFS();
  const result = await ipfs.add([item]);
  if (result.length === 1) {
    return {
      name: result[0].path,
      hash: result[0].hash,
      folder: content === undefined
    };
  } else {
    throw 'error';
  }
}

export async function createDAGNode(hash) {
  const ipfs = await getIPFS();
  return await ipfs.object.get(hash);
}

export async function buildNewPath(currentPath, newCurrentFolderHash) {
  // build new path starting from current folder (that has just changed) going up to root
  const reversedPath = [ ...currentPath ].reverse();
  const newPathReversed = [];
  for (const index in reversedPath) {
    const i = parseInt(index);
    let folder = reversedPath[i];
    const hash = multihashes.fromB58String(folder.hash);
    let newCID = new CID(newCurrentFolderHash)
    const ipfs = await getIPFS();
    if (i !== 0) {
      // Not current dir, this directory is higher in the tree. Need to replace child link
      const child = newPathReversed[i-1];
      const childHash = multihashes.fromB58String(child.hash);
      // find old link
      const currentContents = await readLinks(folder.hash);
      const oldChild = fileWithName(currentContents, child.name);
      const oldDagLink = await createDAGLink(child.name, oldChild.size, multihashes.fromB58String(oldChild.hash));
      // remove old link
      newCID = await ipfs.object.patch.rmLink(hash, oldDagLink);
      // prepare new child link
      const dagLink = await createDAGLink(child.name, child.size, childHash);
      // add new child link
      newCID = await ipfs.object.patch.addLink(newCID.toBaseEncodedString(), dagLink);
    }
    const newCIDString = newCID.toBaseEncodedString()
    const newDAGNode = createDAGNode(newCIDString)
    newPathReversed.push(Object.assign({}, folder, {
      hash: newCIDString,
      size: newDAGNode.size
    }));
  }
  return newPathReversed.reverse();
}

export async function removeLink(hash, files, name) {
  const link = fileWithName(files, name);
  const dagLink = await createDAGLink(name, link.size, link.hash);
  const ipfs = await getIPFS();
  const newCID = await ipfs.object.patch.rmLink(hash, dagLink);
  return newCID.toBaseEncodedString()
}

export async function renameLink(hash, files, name, newName){
  // Remove link
  const link = fileWithName(files, name);
  const oldDagLink = await createDAGLink(name, link.size, link.hash);
  const ipfs = await getIPFS();
  let newCID = await ipfs.object.patch.rmLink(hash, oldDagLink);
  // Add new link (like old one but renamed)
  const newDagLink = await createDAGLink(newName, link.size, link.hash);
  newCID = await ipfs.object.patch.addLink(newCID.toBaseEncodedString(), newDagLink);
  return newCID.toBaseEncodedString()
}

