import { create } from "zustand";

type Todo = {
  id: string;
  title: string;
};

type TodoState = {
  todos: Todo[];
  todo: Todo;
  addTodo: () => void;
  deleteTodo: (id: string) => void;
  updateTodo: () => void;
  setTodo: (todo: Todo) => void;
};

export const useTodoStore = create<TodoState>((set) => ({
  todos: [
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ],
  todo: { id: "-1", title: "Learn Mongo" },

  addTodo: () =>
    set((state) => ({
      todos: [
        ...state.todos,
        { ...state.todo, id: new Date().getTime().toString() },
      ],
      todo: { id: "-1", title: "" },
    })),

  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),

  updateTodo: () =>
    set((state) => ({
      todos: state.todos.map((item) =>
        item.id === state.todo.id ? state.todo : item
      ),
      todo: { id: "-1", title: "" },
    })),

  setTodo: (todo) => set({ todo }),
}));