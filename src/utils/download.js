import { createWriteStream } from 'streamsaver';
import { getIPFS } from './ipfs';

export async function downloadFromJs(file) {
  // TODO Fix. Broken at the moment
  const ipfs = await getIPFS();
  const readableStream = await ipfs.files.cat(file.hash);
  const downloadStream = createWriteStream(file.name, undefined, file.size);
  const download = downloadStream.getWriter();
  return await new Promise((fullfill, reject) => {
    readableStream
      .on('data', data => download.write(data))
      .on('end', () => { download.close(); fullfill(); })
      .on('error', err => reject(err));
  });
}

export async function downloadFromHTTP(file) {
  window.open('https://ipfs.io/ipfs/' + file.hash, '_blank');
}
