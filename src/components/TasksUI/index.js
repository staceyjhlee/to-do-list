import { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Checkbox,
  List,
  ListItem,
  Container,
  Box,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { toast } from "react-toastify";

const ToDoBoard = ({ id, todos = [] }) => {
  const [toDo, setToDo] = useState("");
  const [toDoList, setToDoList] = useState(todos);

  useEffect(() => {
    if (id) {
      axios(`/api/todo-list/${id}`)
        .then((res) => {
          setToDoList(res.data);
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = async () => {
      try {
        const response = await fetch(`/api/todo-list/${id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            todo: toDo,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          setToDo("");
          setToDoList(data);
        }
      } catch (err) {
        console.log("error in handleSubmit");
      }
    };
    postData();
  };

  const handleDelete = (todoId) => {
    const deleteData = async () => {
      try {
        const response = await fetch(`/api/todo-list/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            toDoId: todoId,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          setToDoList(data);
          toast("Successfully deleted");
        }
      } catch (err) {
        console.error(err);
        toast("There was an error deleting your todo");
      }
    };
    deleteData();
  };

  const handleUpdate = (toDoId, field, data) => {
    const updateData = async () => {
      try {
        const response = await fetch(`/api/todo-list/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            toDoId,
            data,
            field,
          }),
        });
        if (response.ok) {
          const todos = await response.json();
          setToDoList(todos);
          toast("Successfully updated");
        }
      } catch (err) {
        toast("There was an error updating your todo");
        console.error(err);
      }
    };
    updateData();
  };

  return (
    <Container sx={{ overflowY: "scroll", maxHeight: "100%", height: "100%" }}>
      <form onSubmit={handleSubmit}>
        <Typography variant='h4'>Add To-Do</Typography>
        <Box display='flex' gap='1rem' sx={{ width: "100%" }}>
          <TextField
            fullWidth
            placeholder='Add to do here...'
            value={toDo}
            onChange={(e) => setToDo(e.target.value)}
            required
          ></TextField>
          <Button type='submit' variant='contained'>
            Add
          </Button>
        </Box>
      </form>

      <ul style={{ padding: 0 }}>
        {toDoList.map((todoObj, i) => {
          return (
            <List key={todoObj.id}>
              <ListItem
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <Checkbox
                    checked={todoObj.completed}
                    onClick={(e) => {
                      const val = e.target.checked;
                      handleUpdate(todoObj.id, "completed", val);
                    }}
                  />
                  <TextField
                    fullWidth
                    type='text'
                    value={todoObj.todo}
                    onChange={(e) =>
                      setToDoList((oldState) => {
                        const copiedState = [...oldState];
                        copiedState[i].todo = e.target.value;

                        return copiedState;
                      })
                    }
                  />
                </div>
                <Box display='flex' gap='1rem'>
                  <Button
                    variant='outlined'
                    onClick={() =>
                      handleUpdate(todoObj.id, "todo", todoObj.todo)
                    }
                  >
                    <Edit />
                    Update
                  </Button>
                  <Button
                    variant='outlined'
                    onClick={() => handleDelete(todoObj.id)}
                    color='error'
                  >
                    <Delete />
                    delete
                  </Button>
                </Box>
              </ListItem>
            </List>
          );
        })}
      </ul>
    </Container>
  );
};

export default ToDoBoard;
