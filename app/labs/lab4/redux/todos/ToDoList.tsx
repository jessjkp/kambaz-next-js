"use client";

import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import TodoForm from "./ToDoForm";
import TodoItem from "./ToDoItem";
import { RootState } from "../../store";

type Todo = {
  id: string;
  title: string;
};

export default function TodoList() {
  const { todos } = useSelector((state: RootState) => state.todosReducer);

  return (
    <div id="wd-todo-list-redux">
      <h2>Todo List</h2>
      <ListGroup>
        <TodoForm />
        {todos.map((todo: Todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}