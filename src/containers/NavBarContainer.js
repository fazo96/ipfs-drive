import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import NavBar from '../components/NavBar';

export const NavBarContainer = ({ loading }) => {
  return (
    <NavBar loading={loading > 0} />
  );
};

NavBarContainer.propTypes = {
  loading: PropTypes.number,
};

function mapStateToProps(state) {
  return {
    loading: state.loading.counter
  };
}

export default connect(
  mapStateToProps
)(NavBarContainer);
