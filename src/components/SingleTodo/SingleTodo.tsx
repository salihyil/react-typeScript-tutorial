import React, { FormEvent, useEffect, useRef, useState } from 'react';
import './styles.css';

import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { Todo } from '../../models/todo';
import { TodoActionType } from '../../reducer/Todo';
import { useTodoContext } from '../../contexts/todo';

type Props = {
  todo: Todo;
};

const SingleTodo: React.FC<Props> = ({ todo }) => {
  const { dispatch } = useTodoContext();
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDone = (id: number) => {
    dispatch({ type: TodoActionType.DONE, payload: id });
  };

  const handleDelete = () => {
    dispatch({ type: TodoActionType.REMOVE, payload: todo.id });
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
    setEdit(!edit);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  console.log('SingleTodo');

  return (
    <form
      className="todos__single"
      onSubmit={(e) => handleSubmit(e, todo.id)}
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
          className={`todos__single--text ${todo.isDone ? 'line-through' : ''}`}
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
          onClick={handleDelete}
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
  );
};

export default SingleTodo;
