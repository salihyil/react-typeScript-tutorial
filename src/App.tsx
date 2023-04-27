import React from 'react';

import '../src/App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList/TodoList';

import { TodoActionType } from './reducer/Todo';
import { useTodoContext } from './contexts/todo';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { DROPPABLE_ID } from './constant/dragAndDrop';

const App: React.FC = () => {
  const { todo, setTodo, todos, dispatch, completedTodos, setCompletedTodos } =
    useTodoContext();

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();
    if (todo) {
      dispatch({ type: TodoActionType.ADD, payload: todo });
      setTodo('');
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    let add,
      active = todos,
      complete = completedTodos;

    if (source.droppableId === DROPPABLE_ID.TODO_LIST) {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === DROPPABLE_ID.TODO_LIST) {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    dispatch({ type: TodoActionType.DROP, payload: active });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField handleAdd={handleAdd} />
        <TodoList />
      </div>
    </DragDropContext>
  );
};

export default App;
