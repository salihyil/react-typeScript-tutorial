import React from 'react';
import './styles.css';
import SingleTodo from '../SingleTodo/SingleTodo';

import { useTodoContext } from '../../contexts/todo';

const TodoList: React.FC = () => {
  const { todos } = useTodoContext();

  return (
    <div className="container">
      <div className="todos">
        <span className="todos__heading">Active Task</span>
        {todos.map((todo) => {
          return (
            <SingleTodo
              key={todo.id}
              todo={todo}
            />
          );
        })}
      </div>
      <div className="todos remove">
        <span className="todos__heading">Completed Tasks</span>
        {todos.map((todo) => {
          return (
            <SingleTodo
              key={todo.id}
              todo={todo}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TodoList;
