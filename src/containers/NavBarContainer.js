import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import NavBar from '../components/NavBar';

export const NavBarContainer = ({ path }) => {
  const pathString = path && path.length > 0 ? [path[0].hash].concat(path.slice(1).map(p => p.name)).join('/') : '?';
  return (
    <NavBar path={pathString} />
  );
};

NavBarContainer.propTypes = {
  path: PropTypes.arrayOf(PropTypes.object),
  hash: PropTypes.string
};

function mapStateToProps(state) {
  return {
    path: state.ipfs.path
  };
}

export default connect(
  mapStateToProps
)(NavBarContainer);
