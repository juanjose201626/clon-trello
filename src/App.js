import React,{useState} from 'react';
import TrelloList from './components/TrelloList';
import {makeStyles} from "@material-ui/core";
import background_image from "./images/fondo.jpg";
import AddCardorList from "./components/AddCardorList";
import mockData from "./mockdata";
import ContextAPI from "./ContextApi";
import uuid from 'react-uuid';
import {DragDropContext, Droppable} from "react-beautiful-dnd";

export default function App() {

    const classes = useStyle();
    const [data, setData] = useState(mockData);

    const updateListTitle = (title, listId) =>{
        const list = data.lists[listId];
        list.title = title;
        setData({
            ...data,
            lists: {
                ...data.lists,
                [listId]: list
            }
        });
    }

    const addCard = (title, listId) => {

        console.table([{
            listId,
            title
        }])

        const newCard = {
            id: uuid(),
            title
        }

        const list = data.lists[listId];

        // console.log("list", list);
        list.cards = [...list.cards, newCard];
        setData({
            ...data,
            lists: {
                ...data.lists,
                [listId] : list
            }
        })
    }

    const addList = (title) => {
        const newListId = uuid();

        const newList = {
            id: newListId,
            title: title,
            cards: []
        }

        console.log({
            listIds: [
                ...data.listIds,
                newListId
            ],
            lists: {
                ...data.lists,
                [newListId]: newList
            }
        });

        setData({
            listIds: [
                ...data.listIds,
                newListId
            ],
            lists: {
                ...data.lists,
                [newListId]: newList
            }
        });
    }

    const onDragEnd = (result) =>{

         const {
             destination,
             destination: {
                 droppableId: destdroppableId,
                 index: destIndex
             },
             source,
             source: {
                 droppableId: sourcedroppableId,
                 index: sourceIndex
             },
             draggableId,
             type,
        } = result

        console.table([
            {
                sourcedroppableId,
                destdroppableId,
                draggableId
            }
        ]);

        console.table([
            {
                type,
                sourceIndex,
                destIndex
            }
        ]);

        if(!destination){
            return;
        }

        if(type === "list"){
            const newListsIds = data.listIds;
            newListsIds.splice(sourceIndex, 1);
            newListsIds.splice(destIndex, 0, draggableId);
            return;
        }

        const sourceList = data.lists[sourcedroppableId];
        const destinationList = data.lists[destdroppableId];
        const draggingCard = sourceList.cards.filter((card)=>card.id === draggableId)[0];

        console.table([
            {
                draggingCard,
                sourceList,
                destinationList
            }
        ]);


        console.log("resultadp",sourcedroppableId === destdroppableId);
        console.log("source drop id", sourcedroppableId);
        console.log("dest drop id", destdroppableId);

        if(sourcedroppableId === destdroppableId){
            // utilizar splice oara intercambiar los indices
            sourceList.cards.splice(sourceIndex, 1);
            destinationList.cards.splice(destIndex, 0, draggingCard);
            // actualizaremos setData con los nuevos
            setData({
               ...data,
               lists: {
                   ...data.lists,
                   [sourceList.id] : destinationList
               }
            });

        }else{
            sourceList.cards.splice(sourceIndex, 1);
            destinationList.cards.splice(destIndex, 0 , draggingCard);
            setData({
                ...data,
                lists: {
                    ...data.lists,
                    [sourceList.id]: sourceList,
                    [destinationList.id]: destinationList
                }
            });
        }

    }

    return (
        <ContextAPI.Provider value={{updateListTitle,  addCard, addList}}>
            <div className={classes.root}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="12345" type="list" direction="horizontal">
                        {
                            (provided) => (
                                <div
                                    ref={provided.innerRef}
                                    className={classes.container}
                                    {...provided.droppableProps}>
                                    {
                                        data?.listIds && data?.listIds.map((listID, index)=>{
                                            const list = data.lists[listID];
                                            return <TrelloList key={listID} list={list} index={index}/>;
                                        })
                                    }
                                    <div>
                                        <AddCardorList type="list"/>
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )
                        }
                    </Droppable>
                </DragDropContext>
            </div>
        </ContextAPI.Provider>
  );
}

const useStyle = makeStyles(theme => ({
    root: {
        minHeight: '100vh',
        backgroundImage: `url(${background_image})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
    },
    container: {
        display: "flex",
    }
}));