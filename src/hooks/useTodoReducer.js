import { useReducer, useCallback } from 'react';

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case 'EDIT_TODO':
      return state.map(todo =>
        todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
      );
    case 'CLEAR_COMPLETED':
      return state.filter(todo => !todo.completed);
    default:
      return state;
  }
};

export const useTodoReducer = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);

  const addTodo = useCallback((text) => {
    if (text.trim()) dispatch({ type: 'ADD_TODO', payload: text });
  }, []);

  const deleteTodo = useCallback((id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  }, []);

  const toggleTodo = useCallback((id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  }, []);

  const editTodo = useCallback((id, text) => {
    if (text.trim()) dispatch({ type: 'EDIT_TODO', payload: { id, text } });
  }, []);

  const clearCompleted = useCallback(() => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  }, []);

  return { todos, addTodo, deleteTodo, toggleTodo, editTodo, clearCompleted };
};
