import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  Avatar,
  ListItemText,
} from '@material-ui/core';
import EmptyIcon from '@material-ui/icons/Error';

const EmptyItem = ({ onClick }) => (
  <ListItem
    button
    onClick={onClick}
  >
    <Avatar><EmptyIcon /></Avatar>
    <ListItemText
      primary="There's nothing here"
      secondary="Try adding something new"
    />
  </ListItem>
);

EmptyItem.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default EmptyItem;
