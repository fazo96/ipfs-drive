import React from 'react';
import PropTypes from 'prop-types';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import ContentPaste from 'material-ui/svg-icons/content/content-paste';
import FolderItem from './FolderItem';
import Toggle from './Toggle';
import filesize from 'filesize';

const FileManagerToolbar = props => {
  const {
    openAddModal,
    clipboardItem,
    handlePaste,
    size
  } = props;
  return (<Toolbar>
    <ToolbarGroup firstChild={true}>
      <ToolbarTitle text={filesize(size || 0)} style={{marginLeft: '22px'}}/>
      { clipboardItem ? <FolderItem {...clipboardItem} /> : <span/> }
    </ToolbarGroup>
    <ToolbarGroup lastChild={true}>
      <Toggle showIf={clipboardItem}>
        <RaisedButton label="Paste" secondary={true} onClick={() => handlePaste(clipboardItem)} icon={<ContentPaste />}/>
        <ToolbarSeparator style={{margin:0}}/>
      </Toggle>
      <RaisedButton label="New" primary={true} onClick={openAddModal}/>
    </ToolbarGroup>
  </Toolbar>);
};

FileManagerToolbar.propTypes = {
  openAddModal: PropTypes.func,
  size: PropTypes.number,
  clipboardItem: PropTypes.object,
  handlePaste: PropTypes.func
};

export default FileManagerToolbar;
