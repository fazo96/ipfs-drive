import IPFS from 'ipfs';
import dagPB from 'ipld-dag-pb';
import multihashes from 'multihashes';

export function createDAGLink(name, length, hash) {
  return new Promise(fullfill => {
    dagPB.DAGLink.create(name, length, hash, (err, x) => fullfill(x));
  });
}

export async function getNode() {
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
  return p.map((obj, i) => {
    if (typeof obj === 'string') {
      if (i === 0) return { hash: obj };
      return { name: obj };
    } else {
      return obj;
    }
  });
}

export async function readDir (hash) {
  const node = await getNode();
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
