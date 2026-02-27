import { useEffect } from 'react';
import { useTodoContext } from '../context/useTodoContext';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { TodoFilters } from './TodoFilters';
import { TodoStats } from './TodoStats';
import { TodoSearch } from './TodoSearch';
import { CategoryManager } from './CategoryManager';
import { UndoRedo } from './UndoRedo';

export const TodoApp = () => {
  const { undo, redo } = useTodoContext();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
            ✅ Todo List avec Context
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
            Projet 21/100 • Context API & Global State
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm">
            Gestion d'état global avec useReducer et Context
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <TodoStats />
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            <TodoForm />
            <CategoryManager />
          </div>

          {/* Main area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Controls */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Mes tâches
                </h2>
                <UndoRedo />
              </div>

              <TodoSearch />
              <TodoFilters />
            </div>

            {/* Todo list */}
            <TodoList />
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            ✨ Fonctionnalités
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">Context API</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  État global avec React Context
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">useReducer</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Logique d'état complexe
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">Actions & Reducers</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Pattern Redux-like
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">Undo/Redo</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Historique des actions (Ctrl+Z/Y)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">Persistance</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  localStorage automatique
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">Filtres & Tri</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Multiples options de filtrage
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">Priorités</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Low, Medium, High
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">Catégories</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Gestion de catégories
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">Statistiques</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Suivi des tâches en temps réel
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            💻 Exemples d'utilisation
          </h2>

          <div className="space-y-6">
            {/* Context setup */}
            <div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-3">Setup du Context :</h3>
              <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
{`import { TodoProvider } from './context/TodoProvider';

function App() {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
}`}
              </pre>
            </div>

            {/* Using the context */}
            <div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-3">Utiliser le Context :</h3>
              <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
{`import { useTodoContext } from './context/useTodoContext';

function MyComponent() {
  const { state, addTodo, toggleTodo } = useTodoContext();
  
  return (
    <div>
      {state.todos.map(todo => (
        <div key={todo.id}>
          <input 
            type="checkbox" 
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          {todo.title}
        </div>
      ))}
    </div>
  );
}`}
              </pre>
            </div>

            {/* Reducer pattern */}
            <div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-3">Pattern Reducer :</h3>
              <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
{`const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    default:
      return state;
  }
};`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};