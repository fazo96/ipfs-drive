import IPFS from 'ipfs';
import dagPB from 'ipld-dag-pb';
import multihashes from 'multihashes';

export const folderData = Buffer.from(new Uint8Array([8, 1]));

export function createDAGLink(name, length, hash) {
  return new Promise(fullfill => {
    // hash can be buffer or string
    dagPB.DAGLink.create(name, length, hash, (err, x) => fullfill(x));
  });
}

export async function getIPFS() {
  return window.ipfs ? window.ipfs : window.ipfs = await create();
}

export async function create () {
  return await new Promise(fullfill => {
    const node = new IPFS({
      store: String(Math.random() + Date.now())
    });

    node.on('ready', () => fullfill(node));
  });
}

export async function readLinks (hash) {
  const ipfs = await getIPFS();
  const links = await ipfs.object.links(hash);
  return links.map(link => {
    return {
      name: link.name,
      hash: multihashes.toB58String(link.multihash),
      size: link.size,
      type: '?'
    };
  });
}

export async function readDir (hash) {
  let links = await readLinks(hash);
  return await Promise.all(links.map(async link => await analyze(link)));
}

function isFolder(dagNode) {
  return dagNode.data.length === 2
    && dagNode.data[0] === folderData[0]
    && dagNode.data[1] === folderData[1];
}

export async function analyze (link) {
  const ipfs = await getIPFS();
  const node = await ipfs.object.get(link.hash);
  return {
    ...link,
    size: node.size,
    folder: isFolder(node)
  };
}

export function fileWithName(files, name) {
  const matches = files.filter(f => f.name === name);
  if (matches.length === 1) return matches[0];
  return null;
}

export async function createItem(name, content) {
  const item = {
    path: name,
    content
  };
  const ipfs = await getIPFS();
  const result = await ipfs.files.add([item]);
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

export async function buildNewPath(currentPath, newCurrentFolderDAGNode) {
  // build new path starting from current folder (that has just changed) going up to root
  const reversedPath = [ ...currentPath ].reverse();
  const newPathReversed = [];
  for (const index in reversedPath) {
    const i = parseInt(index);
    let folder = reversedPath[i];
    const hash = multihashes.fromB58String(folder.hash);
    let newDAGNode = null;
    const ipfs = await getIPFS();
    if (i === 0) {
      // Current dir, just update from new dag node
      newDAGNode = newCurrentFolderDAGNode;
    } else {
      // Not current dir, this directory is higher in the tree. Need to replace child link
      const child = newPathReversed[i-1];
      const childHash = multihashes.fromB58String(child.hash);
      // find old link
      const currentContents = await readLinks(folder.hash);
      const oldChild = fileWithName(currentContents, child.name);
      const oldDagLink = await createDAGLink(child.name, oldChild.size, multihashes.fromB58String(oldChild.hash));
      // remove old link
      newDAGNode = await ipfs.object.patch.rmLink(hash, oldDagLink);
      // prepare new child link
      const dagLink = await createDAGLink(child.name, child.size, childHash);
      // add new child link
      newDAGNode = await ipfs.object.patch.addLink(newDAGNode.multihash, dagLink);
    }
    newPathReversed.push(Object.assign({}, folder, {
      hash: multihashes.toB58String(newDAGNode.multihash),
      size: newDAGNode.size
    }));
  }
  return newPathReversed.reverse();
}
