"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Todo = {
  id: string;
  title: string;
};

type TodosContextType = {
  todos: Todo[];
  todo: Todo;
  addTodo: () => void;
  deleteTodo: (id: string) => void;
  updateTodo: () => void;
  setTodo: (todo: Todo) => void;
};

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ]);

  const [todo, setTodo] = useState<Todo>({
    id: "-1",
    title: "Learn Mongo",
  });

  const addTodo = () => {
    const newTodo = {
      ...todo,
      id: new Date().getTime().toString(),
    };
    setTodos([...todos, newTodo]);
    setTodo({ id: "-1", title: "" });
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const updateTodo = () => {
    const newTodos = todos.map((t) =>
      t.id === todo.id ? todo : t
    );
    setTodos(newTodos);
    setTodo({ id: "-1", title: "" });
  };

  const value: TodosContextType = {
    todos,
    todo,
    addTodo,
    deleteTodo,
    updateTodo,
    setTodo,
  };

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodosContext);
  return context;
};