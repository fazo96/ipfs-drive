import { combineReducers } from 'redux';
import ipfs from './ipfsReducer';
import loading from './loadingReducer';
import addModal from './addModalReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  ipfs,
  loading,
  addModal,
  routing: routerReducer
});

export default rootReducer;
