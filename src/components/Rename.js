import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';

class Rename extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.item.name,
    };
  }

  handleClose = () => {
    const { handleChoose, item } = this.props;
    handleChoose(item.name);
    this.setState({ name: null });
  }

  handleChoose = (name) => {
    const { handleChoose, item } = this.props;
    this.setState({ name: null });
    handleChoose(name || item.name);
  }

  handleChangeName = (event) => {
    this.setState({ name: event.target.value });
  }

  render() {
    const { open, item } = this.props;
    const { name } = this.state;
    const originalName = item.name;

    return (
      <Dialog
        onClose={this.handleClose}
        open={open}
      >
        <DialogTitle>{`Rename ${originalName}`}</DialogTitle>
        <DialogContent>
          <TextField
            label="New name"
            fullWidth
            value={name}
            onChange={this.handleChangeName}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => this.handleChoose(name)}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

Rename.propTypes = {
  handleChoose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
};

export default Rename;
