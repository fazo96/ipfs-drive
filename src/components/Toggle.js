import React from 'react';
import PropTypes from 'prop-types';

const Toggle = ({ showIf, children }) => {
  return showIf ? children : <span/>;
};

Toggle.propTypes = {
  showIf: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.element)
};

export default Toggle;
