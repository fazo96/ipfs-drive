import {
  pathToString,
  pathToArrayOfObjects,
} from './path';

describe('pathToString', () => {
  it('converts array path to string', () => {
    const srcPath = [{ hash: 'abc' }, { name: 'test' }];
    const expected = '/ipfs/abc/test';
    expect(pathToString(srcPath)).toEqual(expected);
  });

  it('passes through paths already in string form', () => {
    const srcPath = '/ipfs/abc/test';
    const expected = '/ipfs/abc/test';
    expect(pathToString(srcPath)).toEqual(expected);
  });

  it('handles IPNS', () => {
    const srcPath = [{ ipns: 'name', hash: 'abc' }, { name: 'test' }];
    const expected = '/ipns/name/test';
    expect(pathToString(srcPath)).toEqual(expected);
  });
});

describe('pathToArrayOfObjects', () => {
  it('converts string path to array of objects', () => {
    const srcPath = '/ipfs/abc/test';
    const expected = [{ hash: 'abc' }, { name: 'test' }];
    expect(pathToArrayOfObjects(srcPath)).toEqual(expected);
  });

  it('passes through paths already in array of object form', () => {
    const srcPath = [{ hash: 'abc' }, { name: 'test' }];
    const expected = [{ hash: 'abc' }, { name: 'test' }];
    expect(pathToArrayOfObjects(srcPath)).toEqual(expected);
  });

  it('handles IPNS', () => {
    const srcPath = '/ipns/name/test';
    const expected = [{ ipns: 'name' }, { name: 'test' }];
    expect(pathToArrayOfObjects(srcPath)).toEqual(expected);
  });
});
