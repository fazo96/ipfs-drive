import { combineReducers } from 'redux';
import ipfs from './ipfsReducer';
import loading from './loadingReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  ipfs,
  loading,
  routing: routerReducer
});

export default rootReducer;
