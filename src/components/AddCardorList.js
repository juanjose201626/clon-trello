import React, { useState } from 'react';
import {
  Collapse,
  fade,
  Paper,
  Typography,
  makeStyles
} from '@material-ui/core';
import AddCardorListText from './AddCardorListText';

const AddCardorList = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyle();
  return (
    <div classes={classes.root}>
      <Collapse in={open}>
        <AddCardorListText />
      </Collapse>
      <Collapse in={!open}>
        <Paper classes={classes.addCardorListText}>
          <Typography>+ Add a card</Typography>
        </Paper>
      </Collapse>
    </div>
  );
};

const useStyle = makeStyles(theme => ({
  root: {
    maxWidth: '300px',
    marginTop: theme.spacing(1)
  },
  addCardorListText: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(0, 1, 1, 1),
    background: '#ebecf0',
    '&:hover': {
      backgroundColor: fade('#000', 0.25)
    }
  }
}));

export default AddCardorList;
