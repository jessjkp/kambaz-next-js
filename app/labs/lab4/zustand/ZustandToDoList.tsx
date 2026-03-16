"use client";

import { Button, FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { useTodoStore } from "./useToDoStore";

export default function ZustandTodoList() {
  const { todos, todo, addTodo, deleteTodo, updateTodo, setTodo } =
    useTodoStore((state) => state);

  return (
    <div id="wd-zustand-todo-list">
      <h2>Zustand Todo List</h2>

      <ListGroup>
        <ListGroupItem>
          <Button onClick={addTodo} id="wd-add-todo-click">
            Add
          </Button>
          <Button onClick={updateTodo} id="wd-update-todo-click">
            Update
          </Button>
          <FormControl
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
        </ListGroupItem>

        {todos.map((todoItem) => (
          <ListGroupItem key={todoItem.id}>
            <Button
              onClick={() => deleteTodo(todoItem.id)}
              id="wd-delete-todo-click"
            >
              Delete
            </Button>
            <Button onClick={() => setTodo(todoItem)} id="wd-set-todo-click">
              Edit
            </Button>
            {todoItem.title}
          </ListGroupItem>
        ))}
      </ListGroup>

      <hr />
    </div>
  );
}