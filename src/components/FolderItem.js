import React from 'react';
import PropTypes from 'prop-types';
import filesize from 'filesize';
import {
  IconButton,
  ListItem,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import FileFolderIcon from '@material-ui/icons/Folder';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import SettingsIcon from '@material-ui/icons/Settings';
import WarningIcon from '@material-ui/icons/Warning';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FolderItemMenu from './FolderItemMenu';

class FolderItem extends React.Component {
  constructor(props) {
    super(props);
    this.menuButton = React.createRef();
  }

  state = {
    menuAnchorEl: null,
  }

  onMenuButtonClick = (event) => {
    const { menuAnchorEl } = this.state;
    this.setState({
      menuAnchorEl: menuAnchorEl ? null : event.currentTarget,
    });
  }

  closeMenu = () => {
    this.setState({ menuAnchorEl: null });
  }

  render() {
    const {
      item,
      onClick,
      handleCut,
      handleCopy,
      handleRemove,
      handleShare,
      handleRename,
    } = this.props;
    const menuProps = {
      handleCut,
      handleCopy,
      handleRemove,
      handleRename,
      handleShare,
    };
    const { menuAnchorEl } = this.state;
    const analyzed = item.size > 0 && typeof item.folder === 'boolean';
    const analyzing = !analyzed && item.analyzing;
    let leftIcon = <WarningIcon />;
    let secondary = 'Metadata not available';
    if (analyzed) {
      leftIcon = item.folder ? <FileFolderIcon /> : <InsertDriveFileIcon />;
      secondary = `Size: ${filesize(item.size)}`;
    } else if (analyzing) {
      leftIcon = <SettingsIcon />;
      secondary = 'Searching IPFS...';
    }
    return (
      <ListItem
        button
        onClick={() => onClick(item)}
      >
        <Avatar>{leftIcon}</Avatar>
        <ListItemText
          primary={item.name || '(No Name)'}
          secondary={secondary}
        />
        <ListItemSecondaryAction>
          <IconButton
            onClick={this.onMenuButtonClick}
          >
            <MoreVertIcon />
          </IconButton>
          <FolderItemMenu
            item={item}
            open={Boolean(menuAnchorEl)}
            onClose={this.closeMenu}
            anchorEl={menuAnchorEl}
            {...menuProps}
          />
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

FolderItem.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  handleCut: PropTypes.func.isRequired,
  handleCopy: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleShare: PropTypes.func.isRequired,
  handleRename: PropTypes.func.isRequired,
};

export default FolderItem;
