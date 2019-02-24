import addModalReducer from './addModalReducer';
import { ADDFILE_MODAL_OPEN, ADDFILE_MODAL_CLOSE, ADD } from '../constants/actionTypes';

describe('Add Modal reducer', () => {
  it('has correct initial state', () => {
    const action = { type: '@@INIT' };
    const expected = { open: false };
    expect(addModalReducer(undefined, action)).toEqual(expected);
  });

  it('opens the modal', () => {
    const state = { open: false };
    const action = { type: ADDFILE_MODAL_OPEN };
    const expected = { open: true };
    expect(addModalReducer(state, action)).toEqual(expected);
  });

  it('closes the modal', () => {
    const state = { open: true };
    const action = { type: ADDFILE_MODAL_CLOSE };
    const expected = { open: false };
    expect(addModalReducer(state, action)).toEqual(expected);
  });

  it('closes the modal on ADD', () => {
    const state = { open: true };
    const action = { type: ADD };
    const expected = { open: false };
    expect(addModalReducer(state, action)).toEqual(expected);
  });
});
