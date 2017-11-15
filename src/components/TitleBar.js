import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import GitHubIcon from './GitHubIcon';
import PropTypes from 'prop-types';

const TitleBar = () => {
  return (<AppBar
    title="IPFS Drive"
    iconElementLeft={<IconButton><MenuIcon /></IconButton>}
    iconElementRight={<IconButton href="https://github.com/fazo96/ipfs-drive"><GitHubIcon /></IconButton>}
  />);
};

TitleBar.propTypes = {
  loading: PropTypes.number
};

export default TitleBar;
