import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FolderViewer from '../components/FolderViewer';
import Add from '../components/Add';
import { openModal, closeModal } from '../actions/addModalActions';
import { setPath as setPathAction } from '../actions/pathActions';
import { add as addAction } from '../actions/writeActions';
import { analyzeLink as analyzeLinkAction } from '../actions/filesActions';
import { pathToArrayOfObjects, getFilePath } from '../utils/path';
import {
  cut as cutAction,
  copy as copyAction,
  remove as removeAction,
  rename as renameAction,
  share as shareAction,
} from '../actions/folderItemActions';
import Rename from '../components/Rename';

class FileManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renamingItem: null,
    };
  }

  onClickitem = (item) => {
    const { path, setPath, analyzeLink } = this.props;
    const analyzed = item.size > 0 && typeof item.folder === 'boolean';
    const analyzing = !analyzed && item.analyzing;
    if (analyzed) {
      setPath(getFilePath(item, path));
    } else if (!analyzing) {
      analyzeLink(item);
    }
  }

  ascend = () => {
    const { path, setPath } = this.props;
    setPath(getFilePath('..', path));
  }

  handleRename = (renamingItem) => {
    this.setState({ renamingItem });
  }

  rename = (newName) => {
    const { rename } = this.props;
    const { renamingItem } = this.state;
    this.setState({ renamingItem: null });
    rename(renamingItem.name, newName);
  }

  render() {
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
    const folderViewer = (
      <FolderViewer
        items={files}
        showParent={showParent}
        onClickItem={this.onClickitem}
        handleAscend={this.ascend}
        handleCut={cut}
        handleCopy={copy}
        handleRemove={remove}
        handleRename={this.handleRename}
        handleNewItem={openAddModal}
        handleShare={share}
      />
    );
    return (
      <div>
        { folderViewer }
        { renamingItem && (
          <Rename
            open={Boolean(renamingItem)}
            handleChoose={this.rename}
            item={renamingItem}
          />
        )}
        <Add
          open={addModalOpen}
          handleClose={closeAddModal}
          handleAdd={add}
        />
      </div>
    );
  }
}

FileManager.propTypes = {
  files: PropTypes.array.isRequired,
  addModalOpen: PropTypes.bool.isRequired,
  add: PropTypes.func.isRequired,
  openAddModal: PropTypes.func.isRequired,
  closeAddModal: PropTypes.func.isRequired,
  setPath: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  path: PropTypes.arrayOf(PropTypes.object).isRequired,
  cut: PropTypes.func.isRequired,
  copy: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  rename: PropTypes.func.isRequired,
  share: PropTypes.func.isRequired,
  analyzeLink: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    files: state.files,
    addModalOpen: state.addModal.open,
    loading: state.currentOperation.active,
    path: state.path,
    notification: state.notification,
    location: state.routing.location,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    add: obj => dispatch(addAction(obj)),
    closeAddModal: () => dispatch(closeModal()),
    setPath: path => dispatch(setPathAction(path)),
    cut: item => dispatch(cutAction(item)),
    copy: item => dispatch(copyAction(item)),
    remove: item => dispatch(removeAction(item)),
    rename: (name, newName) => dispatch(renameAction(name, newName)),
    share: item => dispatch(shareAction(item)),
    analyzeLink: item => dispatch(analyzeLinkAction(item)),
    openAddModal: () => dispatch(openModal()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FileManager);
