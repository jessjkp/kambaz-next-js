"use client";

import HelloRedux from "./hello";
import CounterRedux from "./counterRedux";
import AddRedux from "./AddRedux";
import TodoList from "./todos/ToDoList";
export default function ReduxExamples() {
  return (
    <div>
      <h2>Redux Examples</h2>
      <HelloRedux />
      <CounterRedux />
      <AddRedux />
      <TodoList />
    </div>
  );
}