/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import TitleBar from '../components/TitleBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FileManager from "../containers/FileManager";
import { loadRootHash } from '../actions/ipfsNavigateActions';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    const redirectToEmptyObject = () => <Redirect to={'/ipfs/' + loadRootHash()} />;
    return (
      <MuiThemeProvider>
        <div>
          <TitleBar />
          <Switch>
            <Route path="/ipfs/" component={FileManager} />
            <Route path="/" render={redirectToEmptyObject} />
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
