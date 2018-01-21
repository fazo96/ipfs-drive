import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import TitleBar from '../components/TitleBar';
import WithTheme from '../components/WithTheme';
import FileManagementPage from "./FileManagementPage";
import Homepage from "./Homepage";
import Snackbar from 'material-ui/Snackbar';
import { clearNotification } from '../actions/notificationActions';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';

class App extends React.Component {
  render() {
    const { notification, clearNotification, push } = this.props;
    return (
      <WithTheme>
        <TitleBar onClickBrandIcon={() => push('/')}/>
        <Switch>
          <Route path="/ipfs/" component={FileManagementPage} />
          <Route path="/" component={Homepage} />
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
  clearNotification: PropTypes.func,
  push: PropTypes.func
};

function mapStateToProps(state) {
  return {
    notification: state.notification
  };
}

function mapDispatchToProps(dispatch){
  return {
    clearNotification: () => dispatch(clearNotification()),
    push: url => dispatch(pushAction(url))
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
