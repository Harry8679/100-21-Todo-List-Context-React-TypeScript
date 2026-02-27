import type { TodoAction, Todo, Category, FilterType, SortType } from '../types';

export const addTodo = (todo: Omit<Todo, 'id' | 'createdAt' | 'completed'>): TodoAction => ({
  type: 'ADD_TODO',
  payload: todo,
});

export const updateTodo = (id: string, updates: Partial<Todo>): TodoAction => ({
  type: 'UPDATE_TODO',
  payload: { id, updates },
});

export const deleteTodo = (id: string): TodoAction => ({
  type: 'DELETE_TODO',
  payload: id,
});

export const toggleTodo = (id: string): TodoAction => ({
  type: 'TOGGLE_TODO',
  payload: id,
});

export const setFilter = (filter: FilterType): TodoAction => ({
  type: 'SET_FILTER',
  payload: filter,
});

export const setSort = (sortBy: SortType): TodoAction => ({
  type: 'SET_SORT',
  payload: sortBy,
});

export const setSearch = (query: string): TodoAction => ({
  type: 'SET_SEARCH',
  payload: query,
});

export const addCategory = (category: Omit<Category, 'id'>): TodoAction => ({
  type: 'ADD_CATEGORY',
  payload: category,
});

export const deleteCategory = (id: string): TodoAction => ({
  type: 'DELETE_CATEGORY',
  payload: id,
});

export const clearCompleted = (): TodoAction => ({
  type: 'CLEAR_COMPLETED',
});

export const undo = (): TodoAction => ({
  type: 'UNDO',
});

export const redo = (): TodoAction => ({
  type: 'REDO',
});