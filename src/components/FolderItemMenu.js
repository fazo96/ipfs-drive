import React from 'react';
import PropTypes from 'prop-types';
import {
  Menu,
  Divider,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import CopyIcon from '@material-ui/icons/FileCopy';
import CutIcon from '@material-ui/icons/FileCopyOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';
import RenameIcon from '@material-ui/icons/ShortText';
import CopyToClipboard from 'react-copy-to-clipboard';

const FolderItemMenu = ({
  item,
  anchorEl,
  open,
  onClose,
  handleCut,
  handleCopy,
  handleRemove,
  handleShare,
  handleRename,
}) => {
  const url = `${window.location.href}/${encodeURIComponent(item.name || '')}`;
  return (
    <Menu
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
    >
      <CopyToClipboard text={url} onClick={() => handleShare(item)}>
        <MenuItem onClick={() => handleShare(item)}>
          <ListItemIcon><ShareIcon /></ListItemIcon>
          <ListItemText>Share URL</ListItemText>
        </MenuItem>
      </CopyToClipboard>
      <Divider />
      <MenuItem onClick={() => handleRename(item)}>
        <ListItemIcon><RenameIcon /></ListItemIcon>
        <ListItemText>Rename</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => handleCut(item)}>
        <ListItemIcon><CutIcon /></ListItemIcon>
        <ListItemText>Cut</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => handleCopy(item)}>
        <ListItemIcon><CopyIcon /></ListItemIcon>
        <ListItemText>Copy</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => handleRemove(item)}>
        <ListItemIcon><DeleteIcon /></ListItemIcon>
        <ListItemText>Delete</ListItemText>
      </MenuItem>
    </Menu>
  );
};

FolderItemMenu.propTypes = {
  item: PropTypes.object.isRequired,
  anchorEl: PropTypes.element,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleCut: PropTypes.func.isRequired,
  handleCopy: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleShare: PropTypes.func.isRequired,
  handleRename: PropTypes.func.isRequired,
};

export default FolderItemMenu;

