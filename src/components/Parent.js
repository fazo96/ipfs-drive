import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import FileFolder from 'material-ui/svg-icons/file/folder';
import Avatar from 'material-ui/Avatar';

const Parent = ({ onClick }) => (<ListItem
  leftAvatar={<Avatar icon={<FileFolder />} />}
  primaryText=".."
  secondaryText="Parent"
  onClick={onClick}
/>);

Parent.propTypes = {
  onClick: PropTypes.func
};

export default Parent;
