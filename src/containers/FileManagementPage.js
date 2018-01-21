import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import FileManager from './FileManager';
import SingleFileManager from '../components/SingleFileManager';
import FileManagerToolbarContainer from './FileManagerToolbarContainer';
import LoadingIndicator from '../components/LoadingIndicator';
import { setPath as setPathAction } from '../actions/pathActions';

function FileManagementPage({ loading, path, setPath }) {
  const lastPathItem = path.length > 0 ? path[path.length-1] : {};
  const isFolder = lastPathItem.folder;
  const ascend = path.length > 1 ? (() => setPath(path.slice(0, path.length-1))) : null;
  return (<div>
    { loading ? <div/> : <FileManagerToolbarContainer /> }
    { loading ? <LoadingIndicator /> : (isFolder ? <FileManager /> : <SingleFileManager item={lastPathItem} ascend={ascend} />) }
    </div>);
}

FileManagementPage.propTypes = {
  loading: PropTypes.bool,
  setPath: PropTypes.func,
  path: PropTypes.arrayOf(PropTypes.object)
};

function mapStateToProps(state) {
  return {
    loading: state.currentOperation.active,
    path: state.path
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setPath: x => dispatch(setPathAction(x))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileManagementPage);
