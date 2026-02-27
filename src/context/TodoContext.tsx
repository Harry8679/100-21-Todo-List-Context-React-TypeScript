import { createContext } from 'react';
import type { TodoContextValue } from '../types';

export const TodoContext = createContext<TodoContextValue | null>(null);