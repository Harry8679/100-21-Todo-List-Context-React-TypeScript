import { TodoProvider } from './context/TodoProvider';
import { TodoApp } from './components/TodoApp';

function App() {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
}

export default App;