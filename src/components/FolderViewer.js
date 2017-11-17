import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'material-ui/List';
import FolderItem from './FolderItem';
import Parent from './Parent';

const FolderViewer = ({ items, showParent, onClickItem, handleCut, handleCopy, handleRemove, handleRename }) => {
  return (<List>
    { showParent ? <Parent onClick={onClickItem} /> : <span/> }
    { items.map((f, i) => (<FolderItem
      item={f} key={i} onClick={onClickItem}
      handleCut={handleCut} handleCopy={handleCopy}
      handleRemove={handleRemove} handleRename={handleRename}
      />))
    }
  </List>);
};

FolderViewer.propTypes = {
  items: PropTypes.array,
  showParent: PropTypes.bool,
  onClickItem: PropTypes.func,
  handleCut: PropTypes.func,
  handleCopy: PropTypes.func,
  handlePaste: PropTypes.func,
  handleRemove: PropTypes.func,
  handleRename: PropTypes.func
};

export default FolderViewer;
