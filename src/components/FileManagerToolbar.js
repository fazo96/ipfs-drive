import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

const FileManagerToolbar = ({ path, openAddModal, onClickPathItem }) => {
  return (<Toolbar>
    <ToolbarGroup firstChild={false}>
      { path.map(i => <FlatButton label={i.name || i.hash} key={i.hash} onClick={() => onClickPathItem(i.hash)}/>) }
    </ToolbarGroup>
    <ToolbarGroup lastChild={true}>
      <RaisedButton label="New" primary={true} onClick={openAddModal}/>
    </ToolbarGroup>
  </Toolbar>);
};

FileManagerToolbar.propTypes = {
  path: PropTypes.arrayOf(PropTypes.object),
  openAddModal: PropTypes.func,
  onClickPathItem: PropTypes.func
};

export default FileManagerToolbar;
