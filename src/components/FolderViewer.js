import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'material-ui/List';
import FolderItem from './FolderItem';
import Parent from './Parent';
import EmptyItem from './EmptyItem';

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
};

const itemStyle = {
  maxWidth: '35em',
  width: '100%',
};

const FolderViewer = (props) => {
  const {
    items,
    showParent,
    onClickItem,
    handleAscend,
    handleCut,
    handleCopy,
    handleRemove,
    handleRename,
    handleNewItem,
    handleShare,
  } = props;
  return (
    <div style={containerStyle}>
      <List style={itemStyle}>
        { showParent ? <Parent onClick={handleAscend} style={itemStyle} /> : <span /> }
        { items.map((f, i) => (
          <FolderItem
            item={f}
            key={i}
            onClick={onClickItem}
            handleShare={handleShare}
            handleCut={handleCut}
            handleCopy={handleCopy}
            handleRemove={handleRemove}
            handleRename={handleRename}
          />
        ))
    }
        { items.length === 0 && !showParent ? <EmptyItem style={itemStyle} onClick={handleNewItem} /> : <span /> }
      </List>
    </div>
  );
};

FolderViewer.propTypes = {
  items: PropTypes.array,
  showParent: PropTypes.bool,
  onClickItem: PropTypes.func,
  handleAscend: PropTypes.func,
  handleCut: PropTypes.func,
  handleCopy: PropTypes.func,
  handlePaste: PropTypes.func,
  handleRemove: PropTypes.func,
  handleRename: PropTypes.func,
  handleNewItem: PropTypes.func,
  handleShare: PropTypes.func,
};

export default FolderViewer;
