import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const FolderViewer = ({ files }) => {
  return (<Table>
    <TableHeader>
      <TableRow>
        <TableHeaderColumn>File</TableHeaderColumn>
        <TableHeaderColumn>Status</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
      { (files || []).map(file => {
        return (
          <TableRow key={file.hash}>
            <TableRowColumn>{file.name}</TableRowColumn>
            <TableRowColumn>{file.type}</TableRowColumn>
          </TableRow>);
      })}
    </TableBody>
  </Table>);
};

FolderViewer.propTypes = {
  files: PropTypes.array
};

export default FolderViewer;
