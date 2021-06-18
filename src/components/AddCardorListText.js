import React from 'react';
import { Paper, makeStyles } from '@material-ui/core';

const AddCardorListText = () => {
  const classes = useStyle();
  return <Paper className={classes.trellocard}>Card123</Paper>;
};

const useStyle = makeStyles(theme => ({
  trellocard: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1)
  }
}));

export default AddCardorListText;
