import { configureStore } from "@reduxjs/toolkit";
import helloReducer from "./redux/hello/helloReducer";
import counterReducer from "./redux/counterRedux/counterReducer";
import addReducer     from "./redux/AddRedux/addReducer";
import todosReducer from "./redux/todos/todosreducer";
const store = configureStore({
  reducer: {
    helloReducer,
    counterReducer,
    addReducer,
    todosReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;