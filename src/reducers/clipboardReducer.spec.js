import clipboardReducer from './clipboardReducer';
import { CUT, COPY, CLEAR_CLIPBOARD } from '../constants/actionTypes';

describe('Clipboard reducer', () => {
  it('has correct initial state', () => {
    const action = { type: '@@INIT' };
    const expected = null;
    expect(clipboardReducer(undefined, action)).toEqual(expected);
  });

  it('stores the file in the clipboard on CUT', () => {
    const state = null;
    const action = { type: CUT, item: { name: 'test' } };
    const expected = { name: 'test' };
    expect(clipboardReducer(state, action)).toEqual(expected);
  });

  it('stores the file in the clipboard on COPY', () => {
    const state = null;
    const action = { type: COPY, item: { name: 'test' } };
    const expected = { name: 'test' };
    expect(clipboardReducer(state, action)).toEqual(expected);
  });

  it('handles CLEAR_CLIPBOARD', () => {
    const state = { item: { name: 'john' } };
    const action = { type: CLEAR_CLIPBOARD };
    const expected = null;
    expect(clipboardReducer(state, action)).toEqual(expected);
  });

});
