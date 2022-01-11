import React, {useState} from "react";
import {
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
import {ToDoItemsState} from "../../store/selectors/ToDo.selector";
import {addToDo, deleteToDo, ToDoItemType, toggleToDoSelected} from "../../store/slices/ToDo.slice";

const ToDo = () => {

    let [text, setText] = useState('')
    let todoItems = useSelector(ToDoItemsState)

    const dispatch = useDispatch()

    const handleDelete = (todo: ToDoItemType) => {
        dispatch(deleteToDo(todo.id))
    }
    const handleToggleSelected = (todo: ToDoItemType) => {
        dispatch(toggleToDoSelected(todo.id))
    }
    const handleAdd = () => {
        dispatch(addToDo(text))
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
                        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                            {todoItems.map((value) => {
                                const labelId = value.id

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
                                                    checked={value.selected}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText id={labelId} primary={value.text} />
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Grid>
                </Grid>
            </div>
        </Container>
    </>
}

export default ToDo