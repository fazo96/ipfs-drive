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

const defaultFormValues = {
  name: '',
  content: '',
  hash: '',
  type: types.fromHash,
};

class Add extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...defaultFormValues,
    };
  }

  reset = () => {
    this.setState(defaultFormValues);
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
    const { handleAdd } = this.props;
    const {
      name,
      type,
      content,
      hash,
    } = this.state;
    const obj = { name };
    switch (type) {
      case types.plainText:
        obj.content = content;
        break;
      case types.fromHash:
        obj.hash = hash;
        break;
      case types.emptyFolder: break;
      default:
        return;
    }
    this.setState({ hash: '', content: '' });
    handleAdd(obj);
  }

  handleClose = () => {
    const { handleClose } = this.props;
    handleClose();
    this.reset();
  }

  renderAdditionalFields() {
    const { type, hash, content } = this.state;
    switch (type) {
      case types.plainText:
        return (
          <TextField
            label="Content (Text)"
            name="content"
            fullWidth
            rows={3}
            value={content}
            onChange={this.handleChangeFileContent}
          />
        );
      case types.fromHash:
        return (
          <TextField
            label="Multihash"
            fullWidth
            value={hash}
            onChange={this.handleChangeHash}
          />
        );
      default:
        return <div />;
    }
  }

  render() {
    const { open, handleClose } = this.props;
    const {
      name,
      type,
      content,
      hash,
    } = this.state;
    const canSave = typeof name === 'string'
      && name.length > 0
      && Object.values(types).indexOf(type) >= 0
      && (
        type === types.emptyFolder
        || (type === types.plainText && Boolean(content))
        || (type === types.fromHash && Boolean(hash))
      );

    return (
      <Dialog
        modal={false}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Add Something</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Name"
            value={name}
            onChange={this.handleChangeName}
          />
          <Select
            label="Type"
            value={type}
            onChange={this.handleChangeType}
            fullWidth
          >
            <MenuItem value={types.fromHash}>From Hash</MenuItem>
            <MenuItem value={types.plainText}>Plain Text</MenuItem>
            <MenuItem value={types.emptyFolder}>Empty Folder</MenuItem>
          </Select>
          {this.renderAdditionalFields()}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={!canSave}
            onClick={this.add}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

Add.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default Add;
