import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class Add extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      filename: '',
      content: ''
    };
  }

  handleChangeFilename(filename) {
    this.setState({ filename });
  }

  handleChangeFileContent(content) {
    this.setState({ content });
  }

  addFile() {
    this.props.handleAddFile({
      filename: this.state.filename,
      content: this.state.content
    });
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
        onClick={this.addFile}
      />,
    ];

    return (<Dialog
      title="Add a File"
      actions={actions}
      modal={false}
      open={open}
      onRequestClose={handleClose}
    >
      <TextField floatingLabelText="File Name" name="filename" fullWidth={true} onChange={this.handleChangeFilename}/>
      <TextField floatingLabelText="Content (Text)" name="content" fullWidth={true} rows={3} onChange={this.handleChangeFileContent}/>
    </Dialog>);
  }
}

Add.propTypes = {
  handleClose: PropTypes.func,
  handleAddFile: PropTypes.func,
  open: PropTypes.bool
};

export default Add;
