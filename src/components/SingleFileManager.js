import React from 'react';
import PropTypes from 'prop-types';
import InsertDriveFileIcon from 'material-ui/svg-icons/editor/insert-drive-file';
import { Card, CardActions, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
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
          <FlatButton label="Open in Gateway" href={`https://ipfs.io/ipfs/${hash}`} />
          <CopyToClipboard text={hash}>
            <FlatButton label="Copy Hash" />
          </CopyToClipboard>
          <Toggle showIf={typeof ascend === 'function'}>
            <FlatButton label="View Parent" onClick={ascend} />
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
