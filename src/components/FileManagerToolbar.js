import React from 'react';
import PropTypes from 'prop-types';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarTitle
} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ContentPaste from 'material-ui/svg-icons/content/content-paste';
import Toggle from './Toggle';
import filesize from 'filesize';

const FileManagerToolbar = props => {
  const {
    openAddModal,
    clipboardItem,
    handlePaste,
    handleClear,
    size
  } = props;
  const sizeText = size > 0 ? filesize(size) : '...';
  return (<Toolbar>
    <ToolbarGroup firstChild={true}>
      <ToolbarTitle text={sizeText} style={{marginLeft: '22px'}}/>
    </ToolbarGroup>
    <ToolbarGroup lastChild={true}>
      <Toggle showIf={clipboardItem !== null}>
        <RaisedButton label="Paste" secondary={true} onClick={() => handlePaste(clipboardItem)} icon={<ContentPaste />}/>
      </Toggle>
      <Toggle showIf={size > 4}>
        <FlatButton label="Clear" onClick={handleClear} />
      </Toggle>
      <RaisedButton label="New" primary={true} onClick={openAddModal}/>
    </ToolbarGroup>
  </Toolbar>);
};

FileManagerToolbar.propTypes = {
  openAddModal: PropTypes.func,
  size: PropTypes.number,
  clipboardItem: PropTypes.object,
  handlePaste: PropTypes.func,
  handleClear: PropTypes.func
};

export default FileManagerToolbar;
