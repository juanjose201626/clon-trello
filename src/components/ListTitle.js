import React, {useState, useContext} from 'react';
import {Typography, makeStyles, InputBase,} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ContextApi from '../ContextApi';

const ListTitle = ({title, listId}) => {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const {updateListTitle} = useContext(ContextApi);

  const handleBlur = ()=>{
    updateListTitle(newTitle, listId);
    setOpen(false);
  }

  return (
      <>
        {
          open ?
            (
              <InputBase
                  value={newTitle}
                  onChange={(e)=>setNewTitle(e.target.value)}
                  onBlur={() => handleBlur()}
                  fullWidth
                  autoFocus
                  inputProps={{ className: classes.input}}
              />
            )
              :
            (
                <div className={classes.title}>
                  <Typography
                    className={classes.titleText}
                    onClick={() => setOpen(true)}
                  >
                    {title}
                  </Typography>
                  <MoreHorizIcon />
                </div>
            )
        }
      </>
  );
};

const useStyle = makeStyles(theme => ({
  title: {
    display: 'flex',
    margin: theme.spacing(1)
  },
  titleText: {
    flexGrow: 1,
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  input: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    margin: theme.spacing(1),
    "&:focus": {
      background: "#ddd"
    }
  }
}));
export default ListTitle;
