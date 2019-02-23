import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ExploreIcon from 'material-ui/svg-icons/content/archive';
import PropTypes from 'prop-types';
import GitHubIcon from './GitHubIcon';

const TitleBar = ({ onClickBrandIcon }) => (
  <AppBar
    title="IPFS Drive"
    iconElementLeft={<IconButton onClick={onClickBrandIcon}><ExploreIcon /></IconButton>}
    iconElementRight={<IconButton href="https://github.com/fazo96/ipfs-drive"><GitHubIcon /></IconButton>}
  />
);

TitleBar.propTypes = {
  onClickBrandIcon: PropTypes.func,
};

export default TitleBar;
