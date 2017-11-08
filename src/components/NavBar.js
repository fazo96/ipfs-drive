import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import SyncIcon from 'material-ui/svg-icons/notification/sync';
import PropTypes from 'prop-types';

const NavBar = ({ loading }) => {
  const iconElementRight = loading ? <IconButton><SyncIcon/></IconButton> : null;
  return (<AppBar
    title="Drive"
    iconElementLeft={<IconButton><MenuIcon /></IconButton>}
    iconElementRight={iconElementRight}
  />);
};

NavBar.propTypes = {
  loading: PropTypes.bool
};

export default NavBar;
