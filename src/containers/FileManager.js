import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import FolderViewer from '../components/FolderViewer';
import Add from '../components/Add';
import { closeModal, openModal } from "../actions/addActions";
import { goTo } from '../actions/ipfsNavigateActions';
import { add } from '../actions/ipfsWriteActions';
import LoadingIndicator from '../components/LoadingIndicator';
import FileManagerButtons from '../components/FileManagerButtons';

const removeTrailingSlash = s => {
  if(typeof s === 'string' && s.length > 0 && s[s.length-1] === '/') return s.slice(0, s.length-1);
  return s;
}

class FileManager extends React.Component {
  componentDidMount() {
    if (this.props.path.length === 0) {
      this.props.goTo(this.props.location.pathname.split('/').slice(2));
    }
  }

  componentWillReceiveProps(newProps) {
    const newPathName = removeTrailingSlash(newProps.location.pathname);
    const oldPathName = removeTrailingSlash(this.props.location.pathname);
    if (newPathName !== oldPathName) {
      this.props.goTo(newPathName.split('/').slice(2));
    }
  }

  render () {
    const { files, addModalOpen, loading, add, closeModal, openModal } = this.props;
    return (<div>
      { loading ? <LoadingIndicator /> : <FolderViewer files={files}/> }
      { loading ? <div/> : FileManagerButtons({ openModal }) }
      <Add open={addModalOpen} handleClose={closeModal} handleAdd={add}/>
    </div>);
  }
}

FileManager.propTypes = {
  files: PropTypes.array,
  push: PropTypes.func,
  addModalOpen: PropTypes.bool,
  add: PropTypes.func,
  closeModal: PropTypes.func,
  openModal: PropTypes.func,
  loading: PropTypes.bool,
  goTo: PropTypes.func,
  location: PropTypes.object,
  path: PropTypes.arrayOf(PropTypes.object)
};

function mapStateToProps(state) {
  return {
    files: state.ipfs.files,
    addModalOpen: state.addModal.open,
    loading: state.ipfs.loading,
    path: state.ipfs.path
  };
}

function mapDispatchToProps(dispatch){
  return {
    add: obj => dispatch(add(obj)),
    closeModal: () => dispatch(closeModal()),
    openModal: () => dispatch(openModal()),
    goTo: path => dispatch(goTo(path))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileManager);
