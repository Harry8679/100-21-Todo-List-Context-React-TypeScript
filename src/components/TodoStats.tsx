import { useMemo } from 'react';
import { useTodoContext } from '../context/useTodoContext';

export const TodoStats = () => {
  const { state } = useTodoContext();

  const stats = useMemo(() => {
    const total = state.todos.length;
    const completed = state.todos.filter(todo => todo.completed).length;
    const active = total - completed;
    const highPriority = state.todos.filter(todo => todo.priority === 'high' && !todo.completed).length;

    return { total, completed, active, highPriority };
  }, [state.todos]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
        <div className="text-3xl font-bold">{stats.total}</div>
        <div className="text-sm opacity-90">Total</div>
      </div>

      <div className="bg-linear-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
        <div className="text-3xl font-bold">{stats.completed}</div>
        <div className="text-sm opacity-90">Terminées</div>
      </div>

      <div className="bg-linear-to-br from-yellow-500 to-yellow-600 rounded-xl p-4 text-white">
        <div className="text-3xl font-bold">{stats.active}</div>
        <div className="text-sm opacity-90">Actives</div>
      </div>

      <div className="bg-linear-to-br from-red-500 to-red-600 rounded-xl p-4 text-white">
        <div className="text-3xl font-bold">{stats.highPriority}</div>
        <div className="text-sm opacity-90">Priorité haute</div>
      </div>
    </div>
  );
};