import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import FolderViewer from '../components/FolderViewer';
import Add from '../components/Add';
import { closeModal, openModal } from "../actions/addActions";
import { addTextFile, goTo } from '../actions/ipfsActions';
import LoadingIndicator from '../components/LoadingIndicator';
import FileManagerButtons from '../components/FileManagerButtons';

class FileManager extends React.Component {
  componentDidMount() {
    if (this.props.path.length === 0) {
      this.props.goTo(this.props.location.pathname.split('/').slice(2));
    }
  }

  render () {
    const { files, addModalOpen, loading, addFile, closeModal, openModal } = this.props;
    const circularProgressStyle = {
      marginLeft: 'auto'
    };
    return (<div>
      { loading ? <LoadingIndicator /> : <FolderViewer files={files}/> }
      { loading ? <div/> : FileManagerButtons({ openModal }) }
      <Add open={addModalOpen} handleClose={closeModal} handleAddFile={addFile}/>
    </div>);
  }
}

FileManager.propTypes = {
  files: PropTypes.array,
  push: PropTypes.func,
  addModalOpen: PropTypes.bool,
  addFile: PropTypes.func,
  closeModal: PropTypes.func,
  openModal: PropTypes.func,
  loading: PropTypes.bool,
  goTo: PropTypes.func,
  location: PropTypes.object
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
    addFile: file => dispatch(addTextFile(file.filename, file.content)),
    closeModal: () => dispatch(closeModal()),
    openModal: () => dispatch(openModal()),
    goTo: path => dispatch(goTo(path))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileManager);
