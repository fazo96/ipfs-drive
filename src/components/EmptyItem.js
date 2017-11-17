import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import EmptyIcon from 'material-ui/svg-icons/alert/error';

const EmptyItem = ({ onClick }) => {
  return (<ListItem
    leftAvatar={<Avatar icon={<EmptyIcon/>} />}
    primaryText="There's nothing here"
    secondaryText="Try adding something new"
    onClick={onClick}
  />);
};

EmptyItem.propTypes = {
  onClick: PropTypes.func
};

export default EmptyItem;
