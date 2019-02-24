import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';

const types = {
  plainText: 'plainText',
  fromHash: 'fromHash',
  emptyFolder: 'emptyFolder',
};

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      content: '',
      hash: '',
      type: types.fromHash,
    };
  }

  handleChangeType = (event) => {
    this.setState({
      type: event.target.value,
      content: '',
      hash: '',
    });
  }

  handleChangeName = (event) => {
    this.setState({ name: event.target.value });
  }

  handleChangeFileContent = (event) => {
    this.setState({ content: event.target.value });
  }

  handleChangeHash = (event) => {
    this.setState({ hash: event.target.value });
  }

  add = () => {
    const obj = { name: this.state.name };
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
        return <TextField floatingLabelText="Content (Text)" name="content" fullWidth rows={3} value={this.state.content} onChange={this.handleChangeFileContent.bind(this)} />;
      case types.fromHash:
        return <TextField floatingLabelText="Multihash" name="multihash" fullWidth value={this.state.hash} onChange={this.handleChangeHash.bind(this)} />;
      default:
        return <div />;
    }
  }

  render() {
    const { open, handleClose } = this.props;

    return (
      <Dialog
        modal={false}
        open={open}
        onRequestClose={handleClose}
      >
        <DialogTitle>Add Something</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Name"
            value={this.state.name}
            onChange={this.handleChangeName.bind(this)}
          />
          <Select
            label="Type"
            value={this.state.type}
            onChange={this.handleChangeType}
            fullWidth
          >
            <MenuItem value={types.fromHash}>From Hash</MenuItem>
            <MenuItem value={types.plainText}>Plain Text</MenuItem>
            <MenuItem value={types.emptyFolder}>Empty Folder</MenuItem>
          </Select>
          <DialogActions>
            <Button
              color='primary'
              key="cancel"
              onClick={handleClose}
            >
              Cancel
            </Button>,
            <Button
              color='primary'
              key="save"
              onClick={this.add}
            >
              Save
            </Button>
          </DialogActions>
        </DialogContent>
        {this.renderAdditionalFields()}
      </Dialog>
    );
  }
}

Add.propTypes = {
  handleClose: PropTypes.func,
  handleAdd: PropTypes.func,
  open: PropTypes.bool,
};

export default Add;
