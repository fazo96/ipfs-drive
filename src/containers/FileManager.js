import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import FolderViewer from '../components/FolderViewer';
import Add from '../components/Add';
import { closeModal } from "../actions/addActions";
import { goTo, goToRelative } from '../actions/ipfsNavigateActions';
import { add } from '../actions/ipfsWriteActions';
import LoadingIndicator from '../components/LoadingIndicator';
import { areStringPathsDifferent, pathToArrayOfObjects } from '../utils/path';
import { downloadFromJs as download } from '../utils/download';
import FileManagerToolbarContainer from '../containers/FileManagerToolbarContainer';
import { cut, copy } from '../actions/folderItemActions';

class FileManager extends React.Component {
  componentDidMount() {
    if (this.props.path.length === 0) {
      this.props.goTo(this.props.location.pathname);
    }
  }

  componentWillReceiveProps(newProps) {
    if (areStringPathsDifferent(newProps.location.pathname, this.props.location.pathname)) {
      this.props.goTo(newProps.location.pathname);
    }
  }

  onClickitem(item) {
    if (item.folder) this.props.goToRelative(item.name);
    else download(item);
  }

  render () {
    const {
      files,
      addModalOpen,
      loading,
      add,
      closeModal,
      location,
      handleCut,
      handleCopy
    } = this.props;
    const showParent = pathToArrayOfObjects(location.pathname).length > 1;
    const folderViewer = (<FolderViewer
      items={files}
      showParent={showParent}
      onClickItem={this.onClickitem.bind(this)}
      handleCut={handleCut}
      handleCopy={handleCopy}
    />);
    return (<div>
      { loading ? <div/> : <FileManagerToolbarContainer /> }
      { loading ? <LoadingIndicator /> : folderViewer }
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
  loading: PropTypes.bool,
  goTo: PropTypes.func,
  goToRelative: PropTypes.func,
  location: PropTypes.object,
  path: PropTypes.arrayOf(PropTypes.object),
  handleCut: PropTypes.func,
  handleCopy: PropTypes.func
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
    goToRelative: path => dispatch(goToRelative(path)),
    add: obj => dispatch(add(obj)),
    closeModal: () => dispatch(closeModal()),
    goTo: path => dispatch(goTo(path)),
    handleCut: item => dispatch(cut(item)),
    handleCopy: item => dispatch(copy(item))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileManager);
