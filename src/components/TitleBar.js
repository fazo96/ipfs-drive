import React from 'react';
import PropTypes from 'prop-types';
import {
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core';
import ExploreIcon from '@material-ui/icons/Explore';
import GitHubIcon from './GitHubIcon';

const styles = {
  grow: {
    flexGrow: 1,
  },
};

const TitleBar = ({ onClickBrandIcon, classes }) => (
  <AppBar
    position="static"
  >
    <Toolbar>
      <IconButton onClick={onClickBrandIcon}><ExploreIcon /></IconButton>
      <Typography variant="h6" className={classes.grow}>IPFS Drive</Typography>
      <IconButton href="https://github.com/fazo96/ipfs-drive"><GitHubIcon /></IconButton>
    </Toolbar>
  </AppBar>
);

TitleBar.propTypes = {
  onClickBrandIcon: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitleBar);
