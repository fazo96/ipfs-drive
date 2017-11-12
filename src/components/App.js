/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavBarContainer from '../containers/NavBarContainer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NotFoundPage from './NotFoundPage';
import IPFSRouteDataLoader from "../containers/IPFSRouteDataLoader";

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    const redirectToEmptyObject = () => <Redirect to="/ipfs/QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn" />;
    return (
      <MuiThemeProvider>
        <div>
          <NavBarContainer />
          <Switch>
            <Route path="/ipfs/:path" component={IPFSRouteDataLoader} />
            <Route exact path="/" render={redirectToEmptyObject} />
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
