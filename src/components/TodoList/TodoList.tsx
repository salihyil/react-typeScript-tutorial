import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import SingleTodo from '../SingleTodo/SingleTodo';
import { useTodoContext } from '../../contexts/todo';
import { DROPPABLE_ID } from '../../constant/dragAndDrop';
import './styles.css';

const TodoList: React.FC = () => {
  const { todos, completedTodos } = useTodoContext();

  return (
    <div className="container">
      <Droppable droppableId={DROPPABLE_ID.TODO_LIST}>
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? 'dragactive' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Task</span>
            {todos.map((todo, index) => {
              return (
                <SingleTodo
                  index={index}
                  key={todo.id}
                  todo={todo}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId={DROPPABLE_ID.TODO_REMOVE}>
        {(provided, snapshot) => (
          <div
            className={`todos remove ${
              snapshot.isDraggingOver ? 'dragcomplete' : ''
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Completed Tasks</span>
            {completedTodos.map((todo, index) => {
              return (
                <SingleTodo
                  index={index}
                  key={todo.id}
                  todo={todo}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
