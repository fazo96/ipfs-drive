import React from 'react';
import PropTypes from 'prop-types';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import {
  Card,
  CardActions,
  CardHeader,
  Button,
  Avatar,
} from '@material-ui/core';
import filesize from 'filesize';
import CopyToClipboard from 'react-copy-to-clipboard';
import Toggle from './Toggle';

function SingleFileManager({ item, ascend, handleShare }) {
  const { name, size, hash } = item;
  return (
    <Card style={{ margin: '2em auto', maxWidth: '30em' }}>
      <CardHeader
        title={name || 'Unnamed File'}
        subheader={`Size: ${filesize(size || 0)}`}
        avatar={<Avatar><InsertDriveFileIcon /></Avatar>}
      />
      <Toggle showIf={!!hash}>
        <CardActions>
          <Button
            component="a"
            target="_vblank"
            href={`https://ipfs.io/ipfs/${hash}`}
          >
            Open in Gateway
          </Button>
          <CopyToClipboard text={hash}>
            <Button onClick={() => handleShare(item)}>Copy Hash</Button>
          </CopyToClipboard>
          <Toggle showIf={typeof ascend === 'function'}>
            <Button onClick={ascend}>View Parent</Button>
          </Toggle>
        </CardActions>
      </Toggle>
    </Card>
  );
}

SingleFileManager.defaultProps = {
  ascend: null,
};

SingleFileManager.propTypes = {
  item: PropTypes.object.isRequired,
  handleShare: PropTypes.func.isRequired,
  ascend: PropTypes.func,
};

export default SingleFileManager;
