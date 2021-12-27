import React from 'react';
import { Paper, CssBaseline, makeStyles } from '@material-ui/core';
import ListTitle from './ListTitle';
import TrelloCard from './TrelloCard';
import AddCardorList from './AddCardorList';
import {Draggable, Droppable} from "react-beautiful-dnd";

const TrelloList = ({list, index}) => {
  const classes = useStyle();

  return (
      <Draggable draggableId={list.id} index={index}>
          {
              (provided) => (
                  <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}>
                      <Paper className={classes.root} {...provided.dragHandleProps}>
                          <CssBaseline />
                          <ListTitle title={list.title} listId={list.id} />
                        {provided.placeholder}
                          <Droppable droppableId={list.id}>
                              {
                                  (provided) => (
                                      <div
                                          ref={provided.innerRef}
                                          {...provided.droppableProps}
                                          style={{minHeight: '1px'}}
                                      >
                                          {
                                              list?.cards && list?.cards.map((card, index)=>(
                                                  <TrelloCard key={card.id} card={card} index={index}/>
                                              ))
                                          }
                                          {provided.placeholder}
                                      </div>
                                  )
                              }
                          </Droppable>
                          <AddCardorList type="card" id={list.id} />
                      </Paper>
                  </div>
              )
          }
      </Draggable>
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
