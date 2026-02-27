import { useTodoContext } from '../context/useTodoContext';

export const UndoRedo = () => {
  const { undo, redo, canUndo, canRedo } = useTodoContext();

  return (
    <div className="flex gap-2">
      <button
        onClick={undo}
        disabled={!canUndo}
        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title="Annuler (Ctrl+Z)"
      >
        ↶ Annuler
      </button>
      <button
        onClick={redo}
        disabled={!canRedo}
        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title="Refaire (Ctrl+Y)"
      >
        ↷ Refaire
      </button>
    </div>
  );
};