/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import configureStore, { history } from './store/configureStore';
import Root from './components/Root';

// require('./favicon.ico'); // Tell webpack to load favicon.ico
require('./styles/index.scss');

const store = configureStore();

render(
  <Root store={store} history={history} />,
  document.getElementById('app'),
);
