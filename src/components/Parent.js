import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import FileFolder from 'material-ui/svg-icons/file/folder';
import Avatar from 'material-ui/Avatar';
import ActionInfo from 'material-ui/svg-icons/action/info';

const Parent = ({ onClick }) => (<ListItem
  leftAvatar={<Avatar icon={<FileFolder />} />}
  rightIcon={<ActionInfo />}
  primaryText=".."
  secondaryText="Parent"
  onClick={() => onClick({ name: '..', folder: true })}
/>);

Parent.propTypes = {
  onClick: PropTypes.func
};

export default Parent;
