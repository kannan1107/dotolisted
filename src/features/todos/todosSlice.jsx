import { createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: [], // Your initial state of todos
  reducers: {
    addTodo: (state, action) => {
      state.push({
        id: new Date().toISOString() + Math.random(), // Ensure unique ID for draggable
        text: action.payload,
        completed: false,
      });
    },
    deleteTodo: (state, action) => {
      return state.filter(todo => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    updateTodo: (state, action) => {
      const { id, newText } = action.payload;
      const todo = state.find(todo => todo.id === id);
      if (todo) {
        todo.text = newText;
      }
    },
    // ✨ NEW: Reducer to handle reordering ✨
    reorderTodos: (state, action) => {
      const { startIndex, endIndex } = action.payload;
      const [removed] = state.splice(startIndex, 1); // Remove the item from its original position
      state.splice(endIndex, 0, removed);            // Insert the removed item at the new position
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo, updateTodo, reorderTodos } = todosSlice.actions;

export default todosSlice.reducer;