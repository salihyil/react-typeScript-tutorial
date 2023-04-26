import { FC, useRef } from 'react';
import './styles.css';
import { useTodoContext } from '../../contexts/todo';

interface Props {
  handleAdd: (event: React.FormEvent) => void;
}

const InputField: FC<Props> = ({ handleAdd }) => {
  const { todo, setTodo } = useTodoContext();
  const inputRef = useRef<HTMLInputElement>(null); //enter yapınca box-shadow etkisinin kalması için kullandı.

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(event.target.value);
  };

  return (
    <form
      className="input"
      onSubmit={(event) => {
        handleAdd(event);
        inputRef.current?.blur(); //HTMLElement.blur() yöntemi, klavye odağını geçerli öğeden kaldırır.
      }}
    >
      <input
        ref={inputRef}
        className="input_box"
        type="text"
        placeholder="Enter a task"
        value={todo}
        onChange={handleChange}
      />

      <button
        className="input_submit"
        type="submit"
      >
        Go
      </button>
    </form>
  );
};

export default InputField;
