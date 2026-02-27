import { useState } from 'react';
import { useTodoContext } from '../context/useTodoContext';
import { getPriorityColor, getPriorityLabel, formatDate, isOverdue } from '../utils/helpers';
import type { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const { state, toggleTodo, deleteTodo, updateTodo } = useTodoContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const category = state.categories.find(cat => cat.id === todo.category);
  const overdue = isOverdue(todo.dueDate);

  const handleSave = () => {
    if (editTitle.trim()) {
      updateTodo(todo.id, { title: editTitle });
      setIsEditing(false);
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 ${
      todo.completed ? 'opacity-60' : ''
    }`}>
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <button
          onClick={() => toggleTodo(todo.id)}
          className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
            todo.completed
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300 dark:border-gray-600 hover:border-blue-500'
          }`}
        >
          {todo.completed && (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="flex-1">
          {isEditing ? (
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                className="flex-1 px-3 py-1 border-2 border-blue-500 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white outline-none"
                autoFocus
              />
              <button
                onClick={handleSave}
                className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
              >
                ✓
              </button>
              <button
                onClick={() => {
                  setEditTitle(todo.title);
                  setIsEditing(false);
                }}
                className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
          ) : (
            <h4
              className={`text-lg font-bold mb-2 ${
                todo.completed
                  ? 'line-through text-gray-500 dark:text-gray-400'
                  : 'text-gray-800 dark:text-white'
              }`}
            >
              {todo.title}
            </h4>
          )}

          {todo.description && (
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              {todo.description}
            </p>
          )}

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(todo.priority)}`}>
              {getPriorityLabel(todo.priority)}
            </span>

            {category && (
              <span
                className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                style={{ backgroundColor: category.color }}
              >
                {category.name}
              </span>
            )}

            {todo.dueDate && (
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                overdue && !todo.completed
                  ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              }`}>
                📅 {formatDate(todo.dueDate)}
                {overdue && !todo.completed && ' (En retard)'}
              </span>
            )}

            <span className="text-xs text-gray-500 dark:text-gray-400">
              Créé le {formatDate(todo.createdAt)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Modifier"
          >
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Supprimer"
          >
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};