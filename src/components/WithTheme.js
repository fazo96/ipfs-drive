import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

function WithTheme({ children }) {
  return <MuiThemeProvider><div>{children}</div></MuiThemeProvider>;
}

WithTheme.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
};

export default WithTheme;
