import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import FolderViewer from '../components/FolderViewer';
import Add from '../components/Add';
import { openModal, closeModal } from "../actions/addActions";
import { goTo, goToRelative } from '../actions/ipfsNavigateActions';
import { add } from '../actions/ipfsWriteActions';
import LoadingIndicator from '../components/LoadingIndicator';
import { areStringPathsDifferent, pathToArrayOfObjects } from '../utils/path';
import { downloadFromJs as download } from '../utils/download';
import FileManagerToolbarContainer from '../containers/FileManagerToolbarContainer';
import { cut, copy, remove, rename } from '../actions/folderItemActions';
import Rename from '../components/Rename';

class FileManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renamingItem: null
    };
  }

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
      loading,
      add,
      openAddModal,
      closeAddModal,
      location,
      cut,
      copy,
      remove
    } = this.props;
    const { renamingItem } = this.state;
    const showParent = pathToArrayOfObjects(location.pathname).length > 1;
    const folderViewer = (<FolderViewer
      items={files}
      showParent={showParent}
      onClickItem={this.onClickitem.bind(this)}
      handleCut={cut}
      handleCopy={copy}
      handleRemove={remove}
      handleRename={this.handleRename.bind(this)}
      handleNewItem={openAddModal}
    />);
    return (<div>
      { loading ? <div/> : <FileManagerToolbarContainer /> }
      { loading ? <LoadingIndicator /> : folderViewer }
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
  goTo: PropTypes.func,
  goToRelative: PropTypes.func,
  location: PropTypes.object,
  path: PropTypes.arrayOf(PropTypes.object),
  cut: PropTypes.func,
  copy: PropTypes.func,
  remove: PropTypes.func,
  rename: PropTypes.func
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
    closeAddModal: () => dispatch(closeModal()),
    goTo: path => dispatch(goTo(path)),
    cut: item => dispatch(cut(item)),
    copy: item => dispatch(copy(item)),
    remove: item => dispatch(remove(item)),
    rename: (name, newName) => dispatch(rename(name, newName)),
    openAddModal: () => dispatch(openModal()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileManager);
