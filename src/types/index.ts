// Types pour la todo list

export type Priority = 'low' | 'medium' | 'high';
export type FilterType = 'all' | 'active' | 'completed';
export type SortType = 'date' | 'priority' | 'name';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  category: string;
  createdAt: Date;
  completedAt?: Date;
  dueDate?: Date;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface TodoState {
  todos: Todo[];
  categories: Category[];
  filter: FilterType;
  sortBy: SortType;
  searchQuery: string;
  history: Todo[][];
  historyIndex: number;
}

export type TodoAction =
  | { type: 'ADD_TODO'; payload: Omit<Todo, 'id' | 'createdAt' | 'completed'> }
  | { type: 'UPDATE_TODO'; payload: { id: string; updates: Partial<Todo> } }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'SET_FILTER'; payload: FilterType }
  | { type: 'SET_SORT'; payload: SortType }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'ADD_CATEGORY'; payload: Omit<Category, 'id'> }
  | { type: 'DELETE_CATEGORY'; payload: string }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'LOAD_STATE'; payload: TodoState };

export interface TodoContextValue {
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'completed'>) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  setFilter: (filter: FilterType) => void;
  setSort: (sort: SortType) => void;
  setSearch: (query: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  deleteCategory: (id: string) => void;
  clearCompleted: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}