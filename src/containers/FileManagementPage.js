import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import FileManager from './FileManager';
import FileManagerToolbarContainer from './FileManagerToolbarContainer';
import LoadingIndicator from '../components/LoadingIndicator';

function FileManagementPage({ loading }) {
  return (<div>
    { loading ? <div/> : <FileManagerToolbarContainer /> }
    { loading ? <LoadingIndicator /> : <FileManager /> }
    </div>);
}

FileManagementPage.propTypes = {
  loading: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    loading: state.currentOperation.active
  };
}

export default connect(
  mapStateToProps
)(FileManagementPage);
