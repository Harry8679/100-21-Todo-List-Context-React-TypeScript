import type { Todo, Priority, FilterType, SortType } from '../types';

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const filterTodos = (todos: Todo[], filter: FilterType): Todo[] => {
  switch (filter) {
    case 'active':
      return todos.filter(todo => !todo.completed);
    case 'completed':
      return todos.filter(todo => todo.completed);
    case 'all':
    default:
      return todos;
  }
};

export const searchTodos = (todos: Todo[], query: string): Todo[] => {
  if (!query.trim()) return todos;

  const lowerQuery = query.toLowerCase();
  return todos.filter(
    todo =>
      todo.title.toLowerCase().includes(lowerQuery) ||
      todo.description?.toLowerCase().includes(lowerQuery) ||
      todo.category.toLowerCase().includes(lowerQuery)
  );
};

export const sortTodos = (todos: Todo[], sortBy: SortType): Todo[] => {
  return [...todos].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'priority':
        return getPriorityValue(b.priority) - getPriorityValue(a.priority);
      case 'name':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });
};

export const getPriorityValue = (priority: Priority): number => {
  const values: Record<Priority, number> = {
    high: 3,
    medium: 2,
    low: 1,
  };
  return values[priority];
};

export const getPriorityColor = (priority: Priority): string => {
  const colors: Record<Priority, string> = {
    high: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
    medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
    low: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  };
  return colors[priority];
};

export const getPriorityLabel = (priority: Priority): string => {
  const labels: Record<Priority, string> = {
    high: 'Haute',
    medium: 'Moyenne',
    low: 'Basse',
  };
  return labels[priority];
};

export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const isOverdue = (dueDate?: Date): boolean => {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date();
};