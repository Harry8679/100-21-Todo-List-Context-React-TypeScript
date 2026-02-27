import { useMemo } from 'react';
import { useTodoContext } from '../context/useTodoContext';
import { filterTodos, searchTodos, sortTodos } from '../utils/helpers';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  const { state, clearCompleted } = useTodoContext();

  const filteredTodos = useMemo(() => {
    let todos = state.todos;
    todos = filterTodos(todos, state.filter);
    todos = searchTodos(todos, state.searchQuery);
    todos = sortTodos(todos, state.sortBy);
    return todos;
  }, [state.todos, state.filter, state.searchQuery, state.sortBy]);

  const hasCompleted = state.todos.some(todo => todo.completed);

  if (filteredTodos.length === 0 && state.todos.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
          Aucune tâche
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Commencez par ajouter votre première tâche !
        </p>
      </div>
    );
  }

  if (filteredTodos.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
          Aucun résultat
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Aucune tâche ne correspond à vos critères
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Clear completed button */}
      {hasCompleted && (
        <div className="flex justify-end">
          <button
            onClick={clearCompleted}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
          >
            🗑️ Supprimer les tâches terminées
          </button>
        </div>
      )}

      {/* Todo items */}
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};