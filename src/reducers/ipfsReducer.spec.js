import * as ActionTypes from '../constants/actionTypes';
import reducer from './ipfsReducer';
import initialState from '../reducers/initialState';

describe('Reducers::IPFS', () => {
  const getInitialState = () => initialState.ipfs;

  it('should set initial state by default', () => {
    const action = { type: 'unknown' };
    const expected = getInitialState();

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should handle CHANGE_FILES', () => {
    const files = [
      {
        type: 'folder',
        name: 'Test Folder',
        hash: 'testhash'
      }
    ];
    const action = { type: ActionTypes.CHANGE_FILES, files };
    const expected = Object.assign(getInitialState(), { files });

    expect(reducer(getInitialState(), action)).toEqual(expected);
  });
});
