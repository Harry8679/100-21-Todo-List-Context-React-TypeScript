import type { TodoState, TodoAction, Todo } from '../types';
import { generateId } from '../utils/helpers';

const MAX_HISTORY = 50;

const saveToHistory = (state: TodoState, todos: Todo[]): TodoState => {
  const newHistory = state.history.slice(0, state.historyIndex + 1);
  newHistory.push(todos);

  return {
    ...state,
    history: newHistory.slice(-MAX_HISTORY),
    historyIndex: Math.min(newHistory.length - 1, MAX_HISTORY - 1),
  };
};

export const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'ADD_TODO': {
      const newTodo: Todo = {
        ...action.payload,
        id: generateId(),
        createdAt: new Date(),
        completed: false,
      };
      const newTodos = [...state.todos, newTodo];
      return {
        ...saveToHistory(state, newTodos),
        todos: newTodos,
      };
    }

    case 'UPDATE_TODO': {
      const newTodos = state.todos.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, ...action.payload.updates }
          : todo
      );
      return {
        ...saveToHistory(state, newTodos),
        todos: newTodos,
      };
    }

    case 'DELETE_TODO': {
      const newTodos = state.todos.filter(todo => todo.id !== action.payload);
      return {
        ...saveToHistory(state, newTodos),
        todos: newTodos,
      };
    }

    case 'TOGGLE_TODO': {
      const newTodos = state.todos.map(todo =>
        todo.id === action.payload
          ? {
              ...todo,
              completed: !todo.completed,
              completedAt: !todo.completed ? new Date() : undefined,
            }
          : todo
      );
      return {
        ...saveToHistory(state, newTodos),
        todos: newTodos,
      };
    }

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };

    case 'SET_SORT':
      return {
        ...state,
        sortBy: action.payload,
      };

    case 'SET_SEARCH':
      return {
        ...state,
        searchQuery: action.payload,
      };

    case 'ADD_CATEGORY': {
      const newCategory = {
        ...action.payload,
        id: generateId(),
      };
      return {
        ...state,
        categories: [...state.categories, newCategory],
      };
    }

    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(cat => cat.id !== action.payload),
      };

    case 'CLEAR_COMPLETED': {
      const newTodos = state.todos.filter(todo => !todo.completed);
      return {
        ...saveToHistory(state, newTodos),
        todos: newTodos,
      };
    }

    case 'UNDO': {
      if (state.historyIndex <= 0) return state;
      return {
        ...state,
        todos: state.history[state.historyIndex - 1],
        historyIndex: state.historyIndex - 1,
      };
    }

    case 'REDO': {
      if (state.historyIndex >= state.history.length - 1) return state;
      return {
        ...state,
        todos: state.history[state.historyIndex + 1],
        historyIndex: state.historyIndex + 1,
      };
    }

    case 'LOAD_STATE':
      return action.payload;

    default:
      return state;
  }
};