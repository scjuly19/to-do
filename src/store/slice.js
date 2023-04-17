import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    data: JSON.parse(localStorage.getItem("data")) || [],
    selectedUser: {},
  },
  reducers: {
    addToDo: (state, action) => {
      state.data = state.data.map((user) => {
        if (user.id === action.payload.id) {
          user.todo.push(action.payload.todos);
        }
        return user;
      });
      localStorage.setItem("data", JSON.stringify(state.data));
    },
    removeToDo: (state, action) => {
      state.data = state.data.map((item) => {
        if (item.id === action.payload.id) {
          const updatedTodo = item.todo.filter(
            (todoItem) => todoItem.id != action.payload.task.id
          );
          item.todo = updatedTodo;
        }
        return item;
      });
      localStorage.setItem("data", JSON.stringify(state.data));
    },
    addProfile: (state, action) => {
      state.data.push(action.payload);
      localStorage.setItem("data", JSON.stringify(state.data));
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    selectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    markComplete: (state, action) => {
      state.data = state.data.map((item) => {
        if (item.id === action.payload.id) {
          const updatedTodo = item.todo.map((todoItem) => {
            if (todoItem.id == action.payload.task.id) {
              todoItem.isCompleted = !todoItem.isCompleted;
            }
            return todoItem;
          });
          item.todo = updatedTodo;
        }
        return item;
      });
      localStorage.setItem("data", JSON.stringify(state.data));

    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToDo,
  removeToDo,
  addProfile,
  setData,
  addUser,
  selectedUser,
  markComplete,
} = todoSlice.actions;

export default todoSlice.reducer;
