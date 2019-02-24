import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FileManager from './FileManager';
import SingleFileManager from '../components/SingleFileManager';
import FileManagerToolbarContainer from './FileManagerToolbarContainer';
import LoadingIndicator from '../components/LoadingIndicator';
import { setPath as setPathAction } from '../actions/pathActions';
import { share } from '../actions/folderItemActions';

function FileManagementPage({
  loading,
  path,
  setPath,
  handleShare,
}) {
  const lastPathItem = path.length > 0 ? path[path.length - 1] : {};
  const isFolder = lastPathItem.folder;
  const ascend = path.length > 1 ? (() => setPath(path.slice(0, path.length - 1))) : null;
  return (
    <div>
      {loading && <LoadingIndicator />}
      {!loading && <FileManagerToolbarContainer />}
      {!loading && isFolder && <FileManager />}
      {!loading && !isFolder && (
        <SingleFileManager
          item={lastPathItem}
          acend={ascend}
          handleShare={handleShare}
        />
      )}
    </div>
  );
}

FileManagementPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  setPath: PropTypes.func.isRequired,
  handleShare: PropTypes.func.isRequired,
  path: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return {
    loading: state.currentOperation.active,
    path: state.path,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setPath: x => dispatch(setPathAction(x)),
    handleShare: x => dispatch(share(x)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FileManagementPage);
