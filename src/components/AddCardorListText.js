import React, {useContext, useState} from 'react';
import {Paper, makeStyles, InputBase, Button, IconButton, fade} from '@material-ui/core';
import ClearIcon from "@material-ui/icons/Clear";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ContextApi from "../ContextApi";

const AddCardorListText = ({type, setOpen, listId}) => {
    const classes = useStyle();
    const [title, setTitle] = useState("");
    const {addCard, addList} = useContext(ContextApi);

    const handleAddCardorList = ()  => {
        if(type === "card"){
            addCard(title, listId);
        }else{
            addList(title);
        }
        setTitle("");
        setOpen(false);
    }

    return (
        <>
            <Paper className={classes.card}>
                <InputBase
                    multiline
                    value={title}
                    onBlur={()=> setOpen(false)}
                    onChange={e => setTitle(e.target.value)}
                    placeholder={
                        type === "card" ?
                           "Enter a title for this card...":
                           "Enter list title ..."
                    }
                    inputProps={{className: classes.input}}
                />
            </Paper>
            <div className={classes.confirm}>
                <div className={classes.options}>
                    <Button
                        className={classes.btnConfirm}
                        onClick={handleAddCardorList}
                    >
                        {
                            type === "card" ?
                                "Add Card":
                                "Add List"
                        }
                    </Button>
                    <IconButton onClick={()=>setOpen(false)}>
                        <ClearIcon/>
                    </IconButton>
                </div>
                <IconButton>
                    <MoreHorizIcon/>
                </IconButton>
            </div>
        </>
  )
};

const useStyle = makeStyles(theme => ({
  card: {
    width: "280px",
    paddingBottom: theme.spacing(4),
    margin: theme.spacing(0, 1, 1, 1)
  },
  input: {
      margin: theme.spacing(1)
  },
  confirm: {
   display: "flex",
   margin: theme.spacing(0, 1, 1, 1)
  },
  options:{
      flexGrow: 1,
  },
  btnConfirm: {
     background: '#5aac44',
      color: '#fff',
      "&:hover":{
         background: fade('#5aac44',.75),
      }
  }
}));

export default AddCardorListText;
