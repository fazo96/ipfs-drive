import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import FolderViewer from '../components/FolderViewer';

export const IPFSFolderViewer = ({ files }) => {
    return (<FolderViewer files={files}/>);
};

IPFSFolderViewer.propTypes = {
  files: PropTypes.array
};

function mapStateToProps(state) {
  return {
    files: state.ipfs.files
  };
}

export default connect(
  mapStateToProps
)(IPFSFolderViewer);
