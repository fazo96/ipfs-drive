import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import FileManager from './FileManager';
import SingleFileManager from '../components/SingleFileManager';
import FileManagerToolbarContainer from './FileManagerToolbarContainer';
import LoadingIndicator from '../components/LoadingIndicator';

function FileManagementPage({ loading, path }) {
  const lastPathItem = path.length > 0 ? path[path.length-1] : {};
  const isFolder = lastPathItem.folder;
  return (<div>
    { loading ? <div/> : <FileManagerToolbarContainer /> }
    { loading ? <LoadingIndicator /> : (isFolder ? <FileManager /> : <SingleFileManager item={lastPathItem} />) }
    </div>);
}

FileManagementPage.propTypes = {
  loading: PropTypes.bool,
  path: PropTypes.arrayOf(PropTypes.object)
};

function mapStateToProps(state) {
  return {
    loading: state.currentOperation.active,
    path: state.path
  };
}

export default connect(
  mapStateToProps
)(FileManagementPage);
