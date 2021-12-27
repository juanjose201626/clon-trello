import React from 'react';
import { Paper, makeStyles } from '@material-ui/core';
import {Draggable} from "react-beautiful-dnd";

const TrelloCard = ({card, index}) => {
  const classes = useStyle();
  return (
      <Draggable draggableId={card.id} index={index}>
        {
          (provided) => (
              <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}>
                <Paper className={classes.trellocard}>
                  {card.title}
                </Paper>
              </div>
          )
        }
      </Draggable>
  );
};

const useStyle = makeStyles(theme => ({
  trellocard: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1)
  }
}));

export default TrelloCard;
