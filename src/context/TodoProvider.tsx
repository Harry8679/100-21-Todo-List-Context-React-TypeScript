import { useReducer, useCallback, useMemo, useEffect } from 'react';
import { TodoContext } from './TodoContext';
import { todoReducer } from './todoReducer';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { TodoState, Todo, Category, FilterType, SortType } from '../types';

const initialState: TodoState = {
  todos: [],
  categories: [
    { id: '1', name: 'Personnel', color: '#3b82f6' },
    { id: '2', name: 'Travail', color: '#10b981' },
    { id: '3', name: 'Shopping', color: '#f59e0b' },
  ],
  filter: 'all',
  sortBy: 'date',
  searchQuery: '',
  history: [[]],
  historyIndex: 0,
};

interface TodoProviderProps {
  children: React.ReactNode;
}

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [savedState, setSavedState] = useLocalStorage<TodoState>('todo-state', initialState);
  const [state, dispatch] = useReducer(todoReducer, savedState);

  // Save to localStorage when state changes
  useEffect(() => {
    setSavedState(state);
  }, [state, setSavedState]);

  const addTodo = useCallback(
    (todo: Omit<Todo, 'id' | 'createdAt' | 'completed'>) => {
      dispatch({ type: 'ADD_TODO', payload: todo });
    },
    []
  );

  const updateTodo = useCallback((id: string, updates: Partial<Todo>) => {
    dispatch({ type: 'UPDATE_TODO', payload: { id, updates } });
  }, []);

  const deleteTodo = useCallback((id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  }, []);

  const toggleTodo = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  }, []);

  const setFilter = useCallback((filter: FilterType) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  }, []);

  const setSort = useCallback((sortBy: SortType) => {
    dispatch({ type: 'SET_SORT', payload: sortBy });
  }, []);

  const setSearch = useCallback((query: string) => {
    dispatch({ type: 'SET_SEARCH', payload: query });
  }, []);

  const addCategory = useCallback((category: Omit<Category, 'id'>) => {
    dispatch({ type: 'ADD_CATEGORY', payload: category });
  }, []);

  const deleteCategory = useCallback((id: string) => {
    dispatch({ type: 'DELETE_CATEGORY', payload: id });
  }, []);

  const clearCompleted = useCallback(() => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  }, []);

  const undo = useCallback(() => {
    dispatch({ type: 'UNDO' });
  }, []);

  const redo = useCallback(() => {
    dispatch({ type: 'REDO' });
  }, []);

  const canUndo = state.historyIndex > 0;
  const canRedo = state.historyIndex < state.history.length - 1;

  const value = useMemo(
    () => ({
      state,
      dispatch,
      addTodo,
      updateTodo,
      deleteTodo,
      toggleTodo,
      setFilter,
      setSort,
      setSearch,
      addCategory,
      deleteCategory,
      clearCompleted,
      undo,
      redo,
      canUndo,
      canRedo,
    }),
    [
      state,
      addTodo,
      updateTodo,
      deleteTodo,
      toggleTodo,
      setFilter,
      setSort,
      setSearch,
      addCategory,
      deleteCategory,
      clearCompleted,
      undo,
      redo,
      canUndo,
      canRedo,
    ]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};