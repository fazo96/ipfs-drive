import React from 'react';
import PropTypes from 'prop-types';
import IPFSFolderViewer from './IPFSFolderViewer';
import { goTo } from '../actions/ipfsActions';
import { connect } from 'react-redux';

class IPFSRouteDataLoader extends React.Component {
  componentWillReceiveProps (newProps) {
    const match = newProps.match;
    console.log(match)
    if (match !== null) {
      newProps.goTo(match.params.path);
    }
  }

  componentDidMount () {
    console.log(this.props.match);
    this.props.goTo(this.props.match.params.path);
  }

  render () {
    return <IPFSFolderViewer />;
  }
}

IPFSRouteDataLoader.propTypes = {
  match: PropTypes.object,
  goTo: PropTypes.func
};

function mapDispatchToProps(dispatch){
  return {
    goTo: path => dispatch(goTo(path)),
  };
}

export default connect(
  null,
  mapDispatchToProps
)(IPFSRouteDataLoader);
