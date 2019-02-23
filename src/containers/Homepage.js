import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardHeader } from 'material-ui/Card';
import { push as pushAction } from 'react-router-redux';
import ExploreIcon from 'material-ui/svg-icons/content/archive';
import HelpIcon from 'material-ui/svg-icons/action/help';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import FileFolderIcon from 'material-ui/svg-icons/file/folder';
import WarningIcon from 'material-ui/svg-icons/alert/warning';
import GitHubIcon from '../components/GitHubIcon';
import { loadRootHash } from '../actions/pathActions';

function Homepage({ push }) {
  return (
    <div>
      <Card style={{ margin: '2em auto', maxWidth: '35em' }}>
        <CardHeader
          title="Welcome to IPFS Drive"
          subtitle="An in-browser file manager for IPFS"
          avatar={<Avatar icon={<ExploreIcon />} />}
        />
        <List>
          <ListItem
            leftIcon={<HelpIcon />}
            href="https://ipfs.io"
            primaryText="Learn more about IPFS"
            secondaryText="Knowing IPFS will let you take advantage of our best features"
          />
          <ListItem
            leftIcon={<FileFolderIcon />}
            onClick={() => push(`/ipfs/${loadRootHash()}`)}
            primaryText="Open Empty Folder"
            secondaryText="Start using Drive right now"
          />
          <ListItem
            leftIcon={<GitHubIcon />}
            href="https://github.com/fazo96/ipfs-drive"
            primaryText="Follow development on GitHub"
            secondaryText="Join the discussion and help us shape Drive"
          />
          <ListItem
            leftIcon={<WarningIcon />}
            href="https://github.com/fazo96/ipfs-drive/issues/new"
            primaryText="Warning!"
            secondaryText="This is a development version, there are missing features and bugs. Let us know on GitHub if you run into any issues"
            secondaryTextLines={2}
          />
        </List>
      </Card>
    </div>
  );
}

Homepage.propTypes = {
  push: PropTypes.func,
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
