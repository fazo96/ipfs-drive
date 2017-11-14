import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import FolderViewer from '../components/FolderViewer';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Add from '../components/Add';
import { closeModal, openModal } from "../actions/addActions";
import { addTextFile } from '../actions/ipfsActions';

const IPFSFolderViewer = ({ files, addModalOpen, addFile, closeModal, openModal }) => {
    const buttonBarStyle = {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '1em 3em'
    };

    return (<div>
      <FolderViewer files={files}/>
      <div style={buttonBarStyle}>
        <FloatingActionButton onClick={openModal}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
      <Add open={addModalOpen} handleClose={closeModal} handleAddFile={addFile}/>
    </div>);
};

IPFSFolderViewer.propTypes = {
  files: PropTypes.array,
  push: PropTypes.func,
  addModalOpen: PropTypes.bool,
  addFile: PropTypes.func,
  closeModal: PropTypes.func,
  openModal: PropTypes.func
};

function mapStateToProps(state) {
  return {
    files: state.ipfs.files,
    addModalOpen: state.addModal.open
  };
}

function mapDispatchToProps(dispatch){
  return {
    addFile: (file) => dispatch(addTextFile(file.filename, file.content)),
    closeModal: () => dispatch(closeModal()),
    openModal: () => dispatch(openModal())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IPFSFolderViewer);
