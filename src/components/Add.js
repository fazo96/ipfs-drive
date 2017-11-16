import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const types = {
  plainText: 'plainText',
  fromHash: 'fromHash',
  emptyFolder: 'emptyFolder'
};

class Add extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      content: '',
      hash: '',
      type: types.fromHash
    };
  }

  handleChangeType(event, index, value) {
    this.setState({
      type: value,
      content: '',
      hash: ''
    });
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  handleChangeFileContent(event) {
    this.setState({ content: event.target.value });
  }

  handleChangeHash(event) {
    this.setState({ hash: event.target.value });
  }

  add() {
    let obj = { name: this.state.name };
    switch (this.state.type) {
      case types.plainText:
        obj.content = this.state.content;
        break;
      case types.fromHash:
        obj.hash = this.state.hash;
        break;
      case types.emptyFolder: break;
      default:
        return;
    }
    this.setState({ hash: '', content: '' });
    this.props.handleAdd(obj);
  }

  renderAdditionalFields() {
    switch (this.state.type) {
      case types.plainText:
        return <TextField floatingLabelText="Content (Text)" name="content" fullWidth={true} rows={3} value={this.state.content} onChange={this.handleChangeFileContent.bind(this)}/>;
      case types.fromHash:
        return <TextField floatingLabelText="Multihash" name="multihash" fullWidth={true} value={this.state.hash} onChange={this.handleChangeHash.bind(this)}/>;
      default:
        return <div/>;
    }
  }

  render () {
    const {open, handleClose} = this.props;
    const actions = [
      <FlatButton
        key="cancel"
        label="Cancel"
        primary={true}
        onClick={handleClose}
      />,
      <FlatButton
        key="save"
        label="Save"
        primary={true}
        onClick={this.add.bind(this)}
      />,
    ];

    return (<Dialog
      title="Add Something"
      actions={actions}
      modal={false}
      open={open}
      onRequestClose={handleClose}
    >
      <TextField floatingLabelText="Name" name="name" fullWidth={true} value={this.state.name} onChange={this.handleChangeName.bind(this)}/>
      <SelectField
        floatingLabelText="Type"
        value={this.state.type}
        onChange={this.handleChangeType.bind(this)}
        fullWidth={true}
      >
        <MenuItem value={types.fromHash} primaryText="From Hash" />
        <MenuItem value={types.plainText} primaryText="Plain Text" />
        <MenuItem value={types.emptyFolder} primaryText="Empty Folder" />
      </SelectField>
      {this.renderAdditionalFields()}
    </Dialog>);
  }
}

Add.propTypes = {
  handleClose: PropTypes.func,
  handleAdd: PropTypes.func,
  open: PropTypes.bool
};

export default Add;
