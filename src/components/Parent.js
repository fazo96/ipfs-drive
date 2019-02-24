import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
} from '@material-ui/core';
import FileFolder from '@material-ui/icons/Folder';

const Parent = ({ onClick }) => (
  <ListItem
    button
    onClick={onClick}
  >
    <ListItemAvatar>
      <Avatar><FileFolder /></Avatar>
    </ListItemAvatar>
    <ListItemText
      primary=".."
      secondary="Parent"
    />
  </ListItem>
);

Parent.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Parent;
