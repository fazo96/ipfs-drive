import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import FileFolder from 'material-ui/svg-icons/file/folder';
import InsertDriveFile from 'material-ui/svg-icons/editor/insert-drive-file';
import Avatar from 'material-ui/Avatar';
import filesize from 'filesize';

import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import CopyIcon from 'material-ui/svg-icons/content/content-copy';
import CutIcon from 'material-ui/svg-icons/content/content-cut';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import ShareIcon from 'material-ui/svg-icons/social/share';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="Edit"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon />
  </IconButton>
);

const FolderItem = ({ item, onClick, handleCut, handleCopy, handleDelete, handleShare }) => {
  const rightIconButton = (<IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem primaryText="Share" leftIcon={<ShareIcon />} onClick={() => handleShare(item)}/>
    <Divider />
    <MenuItem primaryText="Cut" leftIcon={<CutIcon />} onClick={() => handleCut(item)}/>
    <MenuItem primaryText="Copy" leftIcon={<CopyIcon />} onClick={() => handleCopy(item)}/>
    <MenuItem primaryText="Delete" leftIcon={<DeleteIcon />} onClick={() => handleDelete(item)}/>
  </IconMenu>);
  return (<ListItem
    leftAvatar={<Avatar icon={item.folder ? <FileFolder /> : <InsertDriveFile />} />}
    rightIconButton={rightIconButton}
    primaryText={item.name || '(No Name)'}
    secondaryText={'Size: ' + filesize(item.size)}
    onClick={() => onClick(item)}
  />);
};

FolderItem.propTypes = {
  item: PropTypes.object,
  onClick: PropTypes.func,
  handleCut: PropTypes.func,
  handleCopy: PropTypes.func,
  handleDelete: PropTypes.func,
  handleShare: PropTypes.func
};

export default FolderItem;
