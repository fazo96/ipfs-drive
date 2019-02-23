import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const LoadingIndicator = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '1em',
  };
  return (
    <div style={containerStyle}>
      <RefreshIndicator
        size={50}
        left={0}
        top={0}
        status="loading"
        style={{ display: 'block', position: 'relative' }}
      />
    </div>
  );
};

export default LoadingIndicator;
