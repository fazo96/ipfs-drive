import { updateSingleItem, updateWholeArray } from './itemArrayUtils';

describe('updateSingleItem function', () => {

  it('applies updates the right object in the array based on hash', () => {
    const existing = [ { hash: '1' }, { hash: '2' } ];
    const expected = [ { hash: '1' }, { hash: '2', additionalInfo: true } ];
    expect(updateSingleItem(existing, { hash: '2', additionalInfo: true })).toEqual(expected);
  });

});

describe('updateWholeArray function', () => {

  it('updates the items', () => {
    const existing = [ { hash: '1' }, { hash: '2' } ];
    const newData = [ { additionalInfo: 1 }, { additionalInfo: 2 } ];
    const expected = [ { hash: '1', additionalInfo: 1 }, { hash: '2', additionalInfo: 2 } ];
    expect(updateWholeArray(existing, newData)).toEqual(expected);
  });

});
