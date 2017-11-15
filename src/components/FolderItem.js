import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import FileFolder from 'material-ui/svg-icons/file/folder';
import InsertDriveFile from 'material-ui/svg-icons/editor/insert-drive-file';
import Avatar from 'material-ui/Avatar';
import ActionInfo from 'material-ui/svg-icons/action/info';
import filesize from 'filesize';

const FolderItem = ({ item, onClick }) => {
  return (<ListItem
    leftAvatar={<Avatar icon={item.folder ? <FileFolder /> : <InsertDriveFile />} />}
    rightIcon={<ActionInfo />}
    primaryText={item.name || '(No Name)'}
    secondaryText={'Size: ' + filesize(item.size)}
    onClick={() => onClick(item.name)}
  />);
};

FolderItem.propTypes = {
  item: PropTypes.object,
  onClick: PropTypes.func
};

export default FolderItem;
