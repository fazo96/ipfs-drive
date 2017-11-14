import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import PropTypes from 'prop-types';

const NavBar = ({ path }) => {
  return (<AppBar
    title={path}
    iconElementLeft={<IconButton><MenuIcon /></IconButton>}
  />);
};

NavBar.propTypes = {
  loading: PropTypes.number
};

export default NavBar;
