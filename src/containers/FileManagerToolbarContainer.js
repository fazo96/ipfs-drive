import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FileManagerToolBar from '../components/FileManagerToolbar';
import { openModal } from '../actions/addActions';
import { goToHashInPath } from '../actions/ipfsNavigateActions';

const FileManagerToolbarContainer = (props) => {
  return <FileManagerToolBar {...props} />;
};

FileManagerToolbarContainer.propTypes = {
  loading: PropTypes.number
};

function mapStateToProps(state) {
  return {
    path: state.ipfs.path
  };
}

function mapDispatchToProps(dispatch){
  return {
    openAddModal: () => dispatch(openModal()),
    onClickPathItem: (hash) => dispatch(goToHashInPath(hash))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileManagerToolbarContainer);
