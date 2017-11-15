/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import TitleBar from '../components/TitleBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NotFoundPage from './NotFoundPage';
import FileManager from "../containers/FileManager";

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    const redirectToEmptyObject = () => <Redirect to="/ipfs/QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn" />;
    return (
      <MuiThemeProvider>
        <div>
          <TitleBar />
          <Switch>
            <Route path="/ipfs/" component={FileManager} />
            <Route path="/" render={redirectToEmptyObject} />
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
