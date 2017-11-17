import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'material-ui/List';
import FolderItem from './FolderItem';
import Parent from './Parent';

const FolderViewer = ({ items, showParent, onClickItem, handleCut, handleCopy}) => {
  return (<List>
    { showParent ? <Parent onClick={onClickItem} /> : <span/> }
    { items.map((f, i) => (<FolderItem
      item={f} key={i} onClick={onClickItem}
      handleCut={handleCut} handleCopy={handleCopy}
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
  handlePaste: PropTypes.func
};

export default FolderViewer;
