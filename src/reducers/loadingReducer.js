import {START_LOADING, DONE_LOADING} from '../constants/actionTypes';
import initialState from './initialState';

export default function loadingReducer(state = initialState.loading, action) {
  switch (action.type) {
    case START_LOADING:
      return Object.assign({}, state, { counter: state.counter + 1 });

    case DONE_LOADING:
      return Object.assign({}, state, { counter: state.counter - 1 });

    default:
      return state;
  }
}
