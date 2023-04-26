import React from 'react';
import '../src/App.css';
import InputField from './components/InputField';

import TodoList from './components/TodoList/TodoList';

import { TodoActionType } from './reducer/Todo';
import { useTodoContext } from './contexts/todo';

const App: React.FC = () => {
  const { todo, setTodo, dispatch } = useTodoContext();

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();
    if (todo) {
      dispatch({ type: TodoActionType.ADD, payload: todo });
      setTodo('');
    }
  };

  console.log('App');

  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField handleAdd={handleAdd} />
      <TodoList />
    </div>
  );
};

export default App;
