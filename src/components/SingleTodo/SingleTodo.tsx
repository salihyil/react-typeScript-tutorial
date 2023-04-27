import React, { FormEvent, useEffect, useRef, useState } from 'react';
import './styles.css';

import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { Todo } from '../../models/todo';
import { TodoActionType } from '../../reducer/Todo';
import { useTodoContext } from '../../contexts/todo';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
  index: number;
  todo: Todo;
};

const SingleTodo: React.FC<Props> = ({ index, todo }) => {
  const { completedTodos, setCompletedTodos, dispatch } = useTodoContext();
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDone = (id: number) => {
    dispatch({ type: TodoActionType.DONE, payload: id });
    setCompletedTodos(
      completedTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isDone: !todo.isDone };
        } else {
          return todo;
        }
      })
    );
  };

  const handleDelete = (id: number) => {
    dispatch({ type: TodoActionType.REMOVE, payload: id });
    setCompletedTodos(completedTodos.filter((todo) => todo.id !== id));
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTodo(e.target.value);
  };

  const handleSubmit = (e: FormEvent, id: number) => {
    e.preventDefault();
    dispatch({ type: TodoActionType.EDIT, payload: { id, editTodo } });
    setCompletedTodos(
      completedTodos.map((todo) =>
        todo.id === id ? { ...todo, todo: editTodo } : todo
      )
    );
    setEdit(!edit);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable
      draggableId={todo.id.toString()}
      index={index}
    >
      {(provider, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging ? 'drag' : ''}`}
          onSubmit={(e) => handleSubmit(e, todo.id)}
          {...provider.draggableProps}
          {...provider.dragHandleProps}
          ref={provider.innerRef}
        >
          {edit ? (
            <input
              ref={inputRef}
              className="todos__single--text "
              value={editTodo}
              onChange={(e) => handleChange(e)}
            />
          ) : (
            <span
              className={`todos__single--text ${
                todo.isDone ? 'line-through' : ''
              }`}
            >
              {todo.todo}
            </span>
          )}

          <div>
            <span
              className="icon"
              onClick={handleEdit}
            >
              <AiFillEdit />
            </span>

            <span
              className="icon"
              onClick={() => handleDelete(todo.id)}
            >
              <AiFillDelete />
            </span>
            <span
              className="icon"
              onClick={() => handleDone(todo.id)}
            >
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
