import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Snackbar } from '@material-ui/core';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';
import TitleBar from '../components/TitleBar';
import FileManagementPage from './FileManagementPage';
import Homepage from './Homepage';
import {
  clearNotification as clearNotificationAction,
} from '../actions/notificationActions';

const App = ({ notification, clearNotification, push }) => (
  <div>
    <TitleBar onClickBrandIcon={() => push('/')} />
    <Switch>
      <Route path="/ipfs/" component={FileManagementPage} />
      <Route path="/" component={Homepage} />
    </Switch>
    <Snackbar
      open={notification.open}
      message={notification.message || ''}
      onClose={clearNotification}
      autoHideDuration={4000}
    />
  </div>
);

App.propTypes = {
  notification: PropTypes.shape({
    open: PropTypes.bool,
    message: PropTypes.string,
  }).isRequired,
  clearNotification: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    notification: state.notification,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clearNotification: () => dispatch(clearNotificationAction()),
    push: url => dispatch(pushAction(url)),
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(App));
