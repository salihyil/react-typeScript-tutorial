import React from 'react';
import './styles.css';
import SingleTodo from '../SingleTodo/SingleTodo';

import { useTodoContext } from '../../contexts/todo';

const TodoList: React.FC = () => {
  const { todos } = useTodoContext();

  console.log("TodoList");
  

  return (
    <div className="todos">
      {todos.map((todo) => {
        return (
          <SingleTodo
            key={todo.id}
            todo={todo}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
