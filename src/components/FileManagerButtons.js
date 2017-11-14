import React from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const FileManagerButtons = ({ openModal }) => {
  const buttonBarStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '1em 3em'
  };

  return (<div style={buttonBarStyle}>
    <FloatingActionButton onClick={openModal}>
      <ContentAdd />
    </FloatingActionButton>
  </div>);
};

FileManagerButtons.propTypes = {
  openModal: PropTypes.func
};

export default FileManagerButtons;
