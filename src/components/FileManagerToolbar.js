import React from 'react';
import PropTypes from 'prop-types';
import {
  Toolbar,
  Button,
} from '@material-ui/core';
import ContentPaste from '@material-ui/icons/ClosedCaption';
import filesize from 'filesize';
import Toggle from './Toggle';

const FileManagerToolbar = (props) => {
  const {
    openAddModal,
    clipboardItem,
    handlePaste,
    handleClear,
    size,
  } = props;
  const sizeText = size > 0 ? filesize(size) : '...';
  return (
    <Toolbar>
      <div style={{ marginLeft: '22px' }}>
        {sizeText}
      </div>
      <div style={{ marginLeft: 'auto' }}>
        <Toggle showIf={clipboardItem !== null}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handlePaste(clipboardItem)}
            icon={<ContentPaste />}
          >
            <ContentPaste />
            Paste
          </Button>
        </Toggle>
        <Toggle showIf={size > 4}>
          <Button onClick={handleClear}>
            Clear
          </Button>
        </Toggle>
        <Button variant="contained" onClick={openAddModal}>Add</Button>
      </div>
    </Toolbar>
  );
};

FileManagerToolbar.propTypes = {
  openAddModal: PropTypes.func,
  size: PropTypes.number,
  clipboardItem: PropTypes.object,
  handlePaste: PropTypes.func,
  handleClear: PropTypes.func,
};

export default FileManagerToolbar;
