import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FileManagerToolBar from '../components/FileManagerToolbar';
import { openModal } from '../actions/addActions';
import { goToHashInPath } from '../actions/ipfsNavigateActions';
import { paste } from '../actions/folderItemActions';

const FileManagerToolbarContainer = (props) => {
  const size = props.path.length > 1 ? 0 : props.path[props.path.length-1].size;
  return <FileManagerToolBar {...props} size={size} />;
};

FileManagerToolbarContainer.propTypes = {
  loading: PropTypes.number,
  path: PropTypes.arrayOf(PropTypes.object),
  openAddModal: PropTypes.func,
  onClickPathItem: PropTypes.func
};

function mapStateToProps(state) {
  return {
    path: state.ipfs.path,
  };
}

function mapDispatchToProps(dispatch){
  return {
    openAddModal: () => dispatch(openModal()),
    onClickPathItem: hash => dispatch(goToHashInPath(hash)),
    handlePaste: item => dispatch(paste(item))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileManagerToolbarContainer);
