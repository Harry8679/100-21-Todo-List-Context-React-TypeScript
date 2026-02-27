import { useTodoContext } from '../context/useTodoContext';
import type { FilterType, SortType } from '../types';

export const TodoFilters = () => {
  const { state, setFilter, setSort } = useTodoContext();

  const filters: Array<{ value: FilterType; label: string }> = [
    { value: 'all', label: 'Toutes' },
    { value: 'active', label: 'Actives' },
    { value: 'completed', label: 'Terminées' },
  ];

  const sorts: Array<{ value: SortType; label: string }> = [
    { value: 'date', label: 'Date' },
    { value: 'priority', label: 'Priorité' },
    { value: 'name', label: 'Nom' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Filter buttons */}
      <div className="flex gap-2">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setFilter(filter.value)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              state.filter === filter.value
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Sort selector */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Trier par :
        </label>
        <select
          value={state.sortBy}
          onChange={(e) => setSort(e.target.value as SortType)}
          className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 outline-none transition-colors"
        >
          {sorts.map((sort) => (
            <option key={sort.value} value={sort.value}>
              {sort.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};