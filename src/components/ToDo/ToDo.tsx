import React, {useEffect, useState} from "react";
import {
    Alert,
    Button,
    Checkbox,
    Container,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    TextField
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from "react-redux";
import {ToDoIsFetchingState, ToDoItemsState} from "../../store/selectors/ToDo.selector";
import {add_todo, delete_todo, get_todos, toggle_todo} from "../../store/slices/ToDo.slice";
import {ToDoItemType} from "../../../types";
import Preloader from "../Preloader/Preloader";
import css from './ToDo.module.scss'

const ToDo = () => {

    let [text, setText] = useState('')
    let todoItems = useSelector(ToDoItemsState)
    let isFetching = useSelector(ToDoIsFetchingState)


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_todos())
    }, [])

    const handleDelete = (todo: ToDoItemType) => {
        dispatch(delete_todo(todo.id))
    }
    const handleToggleSelected = (todo: ToDoItemType) => {
        dispatch(toggle_todo(todo))
    }
    const handleAdd = () => {
        dispatch(add_todo(text))
        setText('')
    }

    return <>
      

        <Container sx={{mt: 5}}>
            <div >
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <TextField label={'Задание'}
                                   value={text}
                                   id={'task'}
                                   fullWidth={true}
                                   size={"small"}
                                   onChange={(e) => setText(e.target.value)} />
                    </Grid>
                    <Grid item xs={4}>
                        <Button size={"medium"}
                                variant={"contained"}
                                onClick={() => handleAdd() }
                                fullWidth={true}  >Добавить</Button>
                    </Grid>
                    <Grid item xs={12}>

                        { !isFetching ? <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                            {todoItems.map((value) => {
                                const labelId = String(value.id)

                                return (
                                    <ListItem
                                        key={labelId}
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(value) }>
                                                <DeleteIcon />
                                            </IconButton>
                                        }
                                        disablePadding
                                    >
                                        <ListItemButton role={undefined} onClick={() => handleToggleSelected(value)} dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={value.completed}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText id={labelId} primary={value.task} />
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List> :  <div className={css.todo_preloader}><Preloader /></div> }
                    </Grid>
                </Grid>
            </div>
        </Container>
    </>
}

export default ToDo