import {SAVE_FUEL_SAVINGS, CALCULATE_FUEL_SAVINGS} from '../constants/actionTypes';
import initialState from './initialState';

export default function ipfsReducer(state = initialState.ipfs, action) {
  switch (action.type) {
    case SAVE_FUEL_SAVINGS:
      return state;

    case CALCULATE_FUEL_SAVINGS:
      return state;

    default:
      return state;
  }
}
