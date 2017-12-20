import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import FolderViewer from '../components/FolderViewer';
import Add from '../components/Add';
import { openModal, closeModal } from "../actions/addModalActions";
import { setPath } from '../actions/pathActions';
import { add } from '../actions/writeActions';
import { analyzeLink } from '../actions/filesActions';
import { pathToArrayOfObjects, getFilePath } from '../utils/path';
import { downloadFromHTTP as download } from '../utils/download';
import { cut, copy, remove, rename, share } from '../actions/folderItemActions';
import Rename from '../components/Rename';

class FileManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renamingItem: null
    };
  }

  onClickitem(item) {
    const { path, setPath, analyzeLink } = this.props;
    const analyzed = item.size > 0 && typeof item.folder === 'boolean';
    const analyzing = !analyzed && item.analyzing;
    if (analyzed) {
      if (item.folder) setPath(getFilePath(item, path));
      else download(item);
    } else if (!analyzing) {
      analyzeLink(item);
    }
  }

  ascend() {
    const { path, setPath } = this.props;
    setPath(getFilePath('..', path));
  }

  handleRename(renamingItem) {
    this.setState({ renamingItem });
  }

  rename(newName) {
    const { renamingItem } = this.state;
    this.setState({ renamingItem: null });
    this.props.rename(renamingItem.name, newName);
  }

  render () {
    const {
      files,
      addModalOpen,
      add,
      openAddModal,
      closeAddModal,
      location,
      cut,
      copy,
      remove,
      share,
    } = this.props;
    const { renamingItem } = this.state;
    const showParent = pathToArrayOfObjects(location.pathname).length > 1;
    const folderViewer = (<FolderViewer
      items={files}
      showParent={showParent}
      onClickItem={this.onClickitem.bind(this)}
      handleAscend={this.ascend.bind(this)}
      handleCut={cut}
      handleCopy={copy}
      handleRemove={remove}
      handleRename={this.handleRename.bind(this)}
      handleNewItem={openAddModal}
      handleShare={share}
    />);
    return (<div>
      { folderViewer }
      <Rename open={renamingItem != null} handleChoose={this.rename.bind(this)} item={renamingItem} />
      <Add open={addModalOpen} handleClose={closeAddModal} handleAdd={add}/>
    </div>);
  }
}

FileManager.propTypes = {
  files: PropTypes.array,
  push: PropTypes.func,
  addModalOpen: PropTypes.bool,
  add: PropTypes.func,
  openAddModal: PropTypes.func,
  closeAddModal: PropTypes.func,
  loading: PropTypes.bool,
  setPath: PropTypes.func,
  location: PropTypes.object,
  path: PropTypes.arrayOf(PropTypes.object),
  cut: PropTypes.func,
  copy: PropTypes.func,
  remove: PropTypes.func,
  rename: PropTypes.func,
  share: PropTypes.func,
  analyzeLink: PropTypes.func,
  notification: PropTypes.object,
  clearNotification: PropTypes.func
};

function mapStateToProps(state) {
  return {
    files: state.files,
    addModalOpen: state.addModal.open,
    loading: state.currentOperation.active,
    path: state.path,
    notification: state.notification,
    location: state.routing.location
  };
}

function mapDispatchToProps(dispatch){
  return {
    add: obj => dispatch(add(obj)),
    closeAddModal: () => dispatch(closeModal()),
    setPath: path => dispatch(setPath(path)),
    cut: item => dispatch(cut(item)),
    copy: item => dispatch(copy(item)),
    remove: item => dispatch(remove(item)),
    rename: (name, newName) => dispatch(rename(name, newName)),
    share: item => dispatch(share(item)),
    analyzeLink: item => dispatch(analyzeLink(item)),
    openAddModal: () => dispatch(openModal()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileManager);
