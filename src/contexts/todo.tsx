import {
  createContext,
  useContext,
  useReducer,
  useState,
  useMemo,
} from 'react';
import { TodoActions, TodoReducer, initialState } from '../reducer/Todo';
import { Todo } from '../models/todo';

interface TodoProviderProps {
  children: React.ReactNode;
}
type Dispatch = (action: TodoActions) => void;
interface IValue {
  todos: Todo[];
  dispatch: Dispatch;
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoContext = createContext<IValue | undefined>(undefined);

function TodoProvider({ children }: TodoProviderProps) {
  const [todos, dispatch] = useReducer(TodoReducer, initialState);
  const [todo, setTodo] = useState<string>('');
  const [completedTodos, setCompletedTodos] = useState<Todo[]>(todos);

  const contextData = useMemo(
    () => ({
      todos,
      dispatch,
      todo,
      setTodo,
      completedTodos,
      setCompletedTodos,
    }),
    [todo, todos, completedTodos]
  );

  return (
    <TodoContext.Provider value={contextData}>{children}</TodoContext.Provider>
  );
}

function useTodoContext() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used withing a TodoProvider');
  }

  return context;
}

export { TodoProvider, useTodoContext };
