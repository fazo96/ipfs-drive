import * as ActionTypes from '../constants/actionTypes';
import reducer from './ipfsReducer';
import initialState from '../reducers/initialState';

describe('Reducers::IPFS', () => {
  const getInitialState = () => Object.assign({}, initialState.ipfs);

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

  it('should handle CHANGE_DIRECTORY to a subdirectory', () => {
    let state = getInitialState();
    const hash = state.files[0].hash;
    const name = state.files[0].name;
    const action = { type: ActionTypes.CHANGE_DIRECTORY, to: name};
    const expected = Object.assign(getInitialState(), { path: state.path.concat({ name, hash }) });

    expect(reducer(getInitialState(), action)).toEqual(expected);
  });

  it('should handle CHANGE_DIRECTORY to the parent', () => {
    let state = getInitialState();
    const subdir = { name: 'subdir', hash: 'subdirhash' };
    state.path = state.path.concat(subdir);
    const action = { type: ActionTypes.CHANGE_DIRECTORY, to: '..'};
    const expected = Object.assign(getInitialState(), { path: getInitialState().path });

    expect(reducer(state, action)).toEqual(expected);
  });

  it('should not do CHANGE_DIRECTORY to a subdirectory that does not exist', () => {
    const action = { type: ActionTypes.CHANGE_DIRECTORY, to: 'Non existant'};

    expect(reducer(getInitialState(), action)).toEqual(getInitialState());
  });

  it('should not run CHANGE_DIRECTORY to parent directory if there is no parent', () => {
    const action = { type: ActionTypes.CHANGE_DIRECTORY, to: '..'};

    expect(reducer(getInitialState(), action)).toEqual(getInitialState());
  });
});
