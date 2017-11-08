/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import IPFSFolderViewer from '../containers/IPFSFolderViewer';
import NavBarContainer from '../containers/NavBarContainer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NotFoundPage from './NotFoundPage';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <NavBarContainer />
          <Switch>
            <Route path="/" component={IPFSFolderViewer} />
            <Route path="/ipfs/:path" component={IPFSFolderViewer} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
