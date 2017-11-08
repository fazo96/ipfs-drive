import * as ActionTypes from '../constants/actionTypes';
import reducer from './loadingReducer';
import initialState from '../reducers/initialState';

describe('Reducers::Loading', () => {
  const getInitialState = () => initialState.loading;

  it('should set initial state by default', () => {
    const action = { type: 'unknown' };
    const expected = getInitialState();

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should handle START_LOADING', () => {
    const action = { type: ActionTypes.START_LOADING };
    const expected = Object.assign(getInitialState(), { loading: 1 });

    expect(reducer(getInitialState(), action)).toEqual(expected);
  });

  it('should handle DONE_LOADING', () => {
    const action = { type: ActionTypes.DONE_LOADING };
    const state = Object.assign(getInitialState(), { loading: 1 });

    expect(reducer(state, action)).toEqual(getInitialState());
  });
});
