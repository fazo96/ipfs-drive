import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class Rename extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: null
    };
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  handleChoose(name) {
    this.setState({ name: null });
    this.props.handleChoose(name);
  }

  handleClose() {
    this.props.handleChoose(this.props.item.name);
    this.setState({ name: null });
  }

  render () {
    const { open, item } = this.props;
    const { name } = this.state;
    const originalName = item ? item.name : '';
    const actions = [
      <FlatButton
        key="save"
        label="Ok"
        primary={true}
        onClick={() => this.handleChoose(name)}
      />,
    ];

    return (<Dialog
      title={'Rename ' + originalName}
      actions={actions}
      modal={false}
      onRequestClose={this.handleClose.bind(this)}
      open={open}
    >
      <TextField
        floatingLabelText="New name"
        name="name"
        fullWidth={true}
        value={name || originalName}
        onChange={this.handleChangeName.bind(this)}
      />
    </Dialog>);
  }
}

Rename.propTypes = {
  handleChoose: PropTypes.func,
  open: PropTypes.bool,
  item: PropTypes.object
};

export default Rename;
