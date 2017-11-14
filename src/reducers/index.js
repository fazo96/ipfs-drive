import { combineReducers } from 'redux';
import ipfs from './ipfsReducer';
import addModal from './addModalReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  ipfs,
  addModal,
  routing: routerReducer
});

export default rootReducer;
