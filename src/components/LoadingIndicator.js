import React from 'react';
import { CircularProgress } from '@material-ui/core';

const LoadingIndicator = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '1em',
  };
  return (
    <div style={containerStyle}>
      <CircularProgress size={50} />
    </div>
  );
};

export default LoadingIndicator;
