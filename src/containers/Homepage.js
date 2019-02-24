import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';
import ExploreIcon from '@material-ui/icons/Archive';
import HelpIcon from '@material-ui/icons/Help';
import {
  Card,
  CardHeader,
  List,
  ListItem,
  Avatar,
  ListItemText,
} from '@material-ui/core';
import FileFolderIcon from '@material-ui/icons/Folder';
import WarningIcon from '@material-ui/icons/Warning';
import GitHubIcon from '../components/GitHubIcon';
import { loadRootHash } from '../actions/pathActions';

function Homepage({ push }) {
  return (
    <div>
      <Card style={{ margin: '2em auto', maxWidth: '35em' }}>
        <CardHeader
          title="Welcome to IPFS Drive"
          subheader="An in-browser file manager for IPFS"
          avatar={<Avatar><ExploreIcon /></Avatar>}
        />
        <List>
          <ListItem
            button
            href="https://ipfs.io"
          >
            <Avatar><HelpIcon /></Avatar>
            <ListItemText
              primary="Learn more about IPFS"
              secondary="Knowing IPFS will let you take advantage of our best features"
            />
          </ListItem>
          <ListItem
            button
            onClick={() => push(`/ipfs/${loadRootHash()}`)}
          >
            <Avatar><FileFolderIcon /></Avatar>
            <ListItemText
              primary="Open Empty Folder"
              secondary="Start using Drive right now"
            />
          </ListItem>
          <ListItem
            button
            href="https://github.com/fazo96/ipfs-drive"
          >
            <Avatar><GitHubIcon /></Avatar>
            <ListItemText
              primary="Follow development on GitHub"
              secondary="Join the discussion and help us shape Drive"
            />
          </ListItem>
          <ListItem
            button
            href="https://github.com/fazo96/ipfs-drive/issues/new"
          >
            <Avatar><WarningIcon /></Avatar>
            <ListItemText
              primary="Warning!"
              secondary={
                <span>
                  This is a development version, there are missing features and bugs.
                  <br/>Let us know on GitHub if you run into any issues
                </span>
              }
            />
          </ListItem>
        </List>
      </Card>
    </div>
  );
}

Homepage.propTypes = {
  push: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    push: x => dispatch(pushAction(x)),
  };
}

export default connect(
  undefined,
  mapDispatchToProps,
)(Homepage);
