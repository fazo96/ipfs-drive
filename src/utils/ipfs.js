import IPFS from 'ipfs';
import dagPB from 'ipld-dag-pb';
import multihashes from 'multihashes';

export const folderData = new Uint8Array([8, 1]);

export function createDAGLink(name, length, hash) {
  return new Promise(fullfill => {
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

export function pathToString(path) {
  const pathString = '/ipfs/' + [path[0].hash].concat(path.slice(1).map(p => p.name)).join('/');
  return pathString;
}

export function preparePath(path) {
  let p = path;
  if (typeof path === 'string'){
    p = p.split('/');
  }
  p = p.filter(s => !!s);
  return p.map((obj, i) => {
    if (typeof obj === 'string') {
      if (i === 0) return { hash: obj };
      return { name: obj };
    } else {
      return obj;
    }
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
    folder: isFolder(node)
  };
}
