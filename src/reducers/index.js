import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import files from './filesReducer';
import path from './pathReducer';
import clipboard from './clipboardReducer';
import addModal from './addModalReducer';
import currentOperation from './operationProgressReducer';
import notification from './notificationReducer';

const rootReducer = combineReducers({
  path,
  files,
  addModal,
  clipboard,
  currentOperation,
  notification,
  routing: routerReducer,
});

export default rootReducer;
