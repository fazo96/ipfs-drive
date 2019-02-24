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

function SingleFileManager({ item, ascend }) {
  const { name, size, hash } = item;
  return (
    <Card style={{ margin: '2em auto', maxWidth: '30em' }}>
      <CardHeader
        title={name || 'Unnamed File'}
        subtitle={`Size: ${filesize(size || 0)}`}
        avatar={<Avatar icon={<InsertDriveFileIcon />} />}
      />
      <Toggle showIf={!!hash}>
        <CardActions>
          <Button href={`https://ipfs.io/ipfs/${hash}`}>Open in Gateway</Button>
          <CopyToClipboard text={hash}>
            <Button>Copy Hash</Button>
          </CopyToClipboard>
          <Toggle showIf={typeof ascend === 'function'}>
            <Button onClick={ascend}>View Parent</Button>
          </Toggle>
        </CardActions>
      </Toggle>
    </Card>
  );
}

SingleFileManager.propTypes = {
  item: PropTypes.object.isRequired,
  ascend: PropTypes.func,
};

export default SingleFileManager;
