import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'material-ui/List';
import FolderItem from './FolderItem';
import Parent from './Parent';

const FolderViewer = ({ items, showParent, onClickItem }) => {
  return (<List>
    { showParent ? <Parent onClick={onClickItem} /> : <span/> }
    { items.map(f => <FolderItem item={f} key={f.hash} onClick={onClickItem} />) }
  </List>);
};

FolderViewer.propTypes = {
  items: PropTypes.array,
  showParent: PropTypes.bool,
  onClickItem: PropTypes.func
};

export default FolderViewer;
