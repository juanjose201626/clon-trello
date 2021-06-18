import React from 'react';
import { Paper, CssBaseline, makeStyles } from '@material-ui/core';
import ListTitle from './ListTitle';
import TrelloCard from './TrelloCard';
import AddCardorList from './AddCardorList';

const TrelloList = () => {
  const classes = useStyle();
  return (
    <Paper className={classes.root}>
      <CssBaseline />
      <ListTitle />
      <TrelloCard />
      <AddCardorList />
    </Paper>
  );
};

const useStyle = makeStyles(theme => ({
  root: {
    maxWidth: '300px',
    background: '#ebecf0',
    margin: theme.spacing(1)
  }
}));

export default TrelloList;
