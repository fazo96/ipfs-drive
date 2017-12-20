import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import TitleBar from '../components/TitleBar';
import WithTheme from '../components/WithTheme';
import FileManagementPage from "../containers/FileManagementPage";
import { loadRootHash } from '../actions/pathActions';
import Snackbar from 'material-ui/Snackbar';
import { clearNotification } from '../actions/notificationActions';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    const { notification, clearNotification } = this.props;
    const redirectToEmptyObject = () => <Redirect to={'/ipfs/' + loadRootHash()} />;
    return (
      <WithTheme>
        <TitleBar />
        <Switch>
          <Route path="/ipfs/" component={FileManagementPage} />
          <Route path="/" render={redirectToEmptyObject} />
        </Switch>
        <Snackbar
          open={notification.open}
          message={notification.message || ''}
          onRequestClose={clearNotification}
          autoHideDuration={4000}
        />
      </WithTheme>
    );
  }
}

App.propTypes = {
  notification: PropTypes.object,
  clearNotification: PropTypes.func
};

function mapStateToProps(state) {
  return {
    notification: state.notification
  };
}

function mapDispatchToProps(dispatch){
  return {
    clearNotification: () => dispatch(clearNotification())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
